import _, { fill } from "lodash";

import { interval, fromEvent, Observable, merge } from "rxjs";
import { map, scan, filter, startWith } from "rxjs/operators";
import { anyOf, allOf, negate, difference, range, swapAt } from "./base/functional";
import { just, Maybe, nothing } from "./base/maybe";
import { Colour } from "./graphics";
import { Instantiate, MoveEffect, output, RefreshDrawObjects, TransformEffect } from "./tetris_io";

/*

                    Tetris : Multi-paradigm Approach
        Functional-Reactive Programming / Object-Oriented Programming.

    The core part of the Tetris game. In this file, effectful code is minimised - it intentionally
    exists in a pair of places: the "subscribe" call for the game$ stream, and the initial value for
    scan on that same stream (where we choose a seed for pseudo-random number generation). Of course,
    the creation and performance of the streams themselves are effects, too.

    The game state is managed through deeply-immutable structures^. The state "changes", then, by
    the streaming of "Actions" and accumulation of "Effects".

    ^These fit the type given by GameState.

        * Actions *
        An Action is a class which accepts an input GameState, and returns a new GameState.
        Actions are how the game's state is "changed" internally. Amongst the attributes of
        a GameState is a list of Effects, and Actions can supply Effects for this list.

        * Effects *
        Effects are managed in tetris_io.ts. When state is reduced in this file, an altered
        GameState, with no Effects, is provided for each base Action. The Action then
        uses Effects to prescribe what tangible changes should happen for the user. Think
        something similar to the IO Monad in Haskell (though confusingly, you might think
        of these Effects as better described as Actions there). The result of executing
        all of the accumulated Effects occurs at the final subscribe call. This way, no
        effectful code is present within the streams or Actions.
    
    The value of designing the Tetris game in this way is visible in the ease with which it
    usually can be extended. Functional code can be concise and simple, but also powerful.
    Object-oriented programming seeks to minimise dependencies between different parts of
    a program by information hiding, and models the program as a series of interacting
    objects which fulfill distinct roles. Functional programming attempts to address a
    similar problem, but does so by minimsing (ideally, eliminating) the mutability of state
    across the program. There is then no need to "hide" things, because they cannot be
    modified in a way which would break existing functions. Reactive programming then manages
    asynchronous behaviour, where functions are "subscribed" or listen to events in
    time. Predominantly, observable streams are used here - if you think of an array as a
    "pull" data structure, where you request data from it, then a stream is a "push" data
    structure, which provides data as it becomes available.

    In this program, these three paradigms are interleaved; we make use of interfaces to
    deeply-immutable objects, which are emmitted through observable streams.

        * Features *
        The game features:
            * pseudo-random ordering of tetrominoes;
            * scoring, with higher scores afforded when more lines are cleared at once,
              or at higher levels;
            * leveling, with appropriate difficulty scaling which includes faster falling
              pieces which lock-in sooner;
            * pausing, and;
            * piece preview.

*/

class Vec2 {
    public static readonly ZERO: Vec2 = new Vec2(0, 0);
    public constructor(public readonly x: number, public readonly y: number) {}
    public add = (other: Vec2) => new Vec2(this.x + other.x, this.y + other.y);
    public subt = (other: Vec2) => new Vec2(this.x - other.x, this.y - other.y)
    public mult = (val: number) => new Vec2(this.x * val, this.y * val);
    public altX = (x: number) => new Vec2(x, this.y);
    public altY = (y: number) => new Vec2(this.x, y);
    public toString = () => `(${this.x},${this.y})`;
}

// The RotateQueue is a fixed-length queue; for every element that is removed from the front of the RotateQueue,
// a new element enters at the back.
class RotateQueue<T> {
    public constructor(public readonly underlying: ReadonlyArray<T>, public readonly front: number = 0) {}
    public frontOf = () => this.underlying.length > this.front ? just(this.underlying[this.front]) : nothing();
    public proceed = (val: T) => new RotateQueue<T>(swapAt(this.underlying)(this.front)(val), (this.front + 1) % this.underlying.length);
    public get = (at: number) => this.underlying.length > 0 ? just<T>(this.underlying[(this.front + at) % this.underlying.length]) : nothing<T>();
}

enum Direction {
    ANTICLOCKWISE = -1,
    CLOCKWISE = 1
}

// A logical object which describes something with shape and colour.
type Sprite = Readonly<{
    colour: Colour,
    occupies: ReadonlyArray<Vec2>
}>;

type GameObject = Readonly<{
    // The ID of the associated object bag for this GameObject.
    id: number,
    falling: boolean,
    sprite: Sprite,
    position: Vec2
}>;

type GameState = Readonly<{
    seed: number,
    randomIncrement: number,
    gameObjects: ReadonlyArray<GameObject>,
    nextTetrominoes: RotateQueue<Sprite>,
    waitTime: number,
    paused: boolean,
    effects: ReadonlyArray<Effect>,
    score: number,
    level: number,
    linesCleared: number,
    gameOver: boolean,
    internalTick: number,
    nextId: number
}>;

const Tetromino = new class {
    readonly I: Sprite = {
        colour: Colour.CYAN,
        occupies: [ new Vec2(0, -1), new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2) ]
    };
    readonly L: Sprite = {
        colour: Colour.ORANGE,
        occupies: [ new Vec2(0, -1), new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 1) ]
    };
    readonly J: Sprite = {
        colour: Colour.BLUE,
        occupies: [ new Vec2(0, -1), new Vec2(0, 0), new Vec2(0, 1), new Vec2(-1, 1) ]
    };
    readonly O: Sprite = {
        colour: Colour.YELLOW,
        occupies: [ new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 0), new Vec2(1, 1) ]
    }
    readonly T: Sprite = {
        colour: Colour.MAGENTA,
        occupies: [ new Vec2(-1, 0), new Vec2(0, 0), new Vec2(1, 0), new Vec2(0, 1) ]
    }
    readonly S: Sprite = {
        colour: Colour.GREEN,
        occupies: [ new Vec2(-1, 0), new Vec2(0, 0), new Vec2(0, -1), new Vec2(1, -1) ]
    }
    readonly Z: Sprite = {
        colour: Colour.RED,
        occupies: [ new Vec2(-1, 0), new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 1) ]
    }
    readonly SELECT: ReadonlyArray<Sprite> = [this.I, this.L, this.J, this.O, this.T, this.S, this.Z];
}

const C = new class {
    ///--- Backing ---///
    readonly BACKDROP_ID: string = "backdrop";
    readonly PIXEL_WIDTH: number = 600;
    readonly PIXEL_HEIGHT: number = 1200;
    readonly PIXEL_VERTICAL_OFFSET = 200;
    readonly TILES_HORIZONTAL: number = 10;
    readonly TILES_VERTICAL: number = 20;
    readonly TILE_WIDTH: number = this.PIXEL_WIDTH / this.TILES_HORIZONTAL;
    readonly TILE_HEIGHT: number = this.PIXEL_HEIGHT / this.TILES_VERTICAL;
    readonly UI_ID_OFFSET: number = -1;
    readonly SCORE_TEXT_ID: string = "score";
    readonly LEVEL_TEXT_ID: string = "level";
    readonly NOTIFICATION_TEXT_ID: string = "notification";
    readonly SCORE_PREFIX: string = "Score: ";
    readonly LEVEL_PREFIX: string = "Level: ";
    readonly NOTIFICATION_PAUSED: string = "Game Paused";
    readonly NOTIFICATION_GAME_OVER: string = "Game Over!";
    /// ---        --- ///

    readonly DEFAULT_SPRITE: Sprite = {
        colour: Colour.BLACK,
        occupies: [ Vec2.ZERO ]
    }
    readonly OBJECT_ORIGIN_POSITION: Vec2 = new Vec2(Math.floor(this.TILES_HORIZONTAL / 2), 1);
    readonly WAIT_TIME: number = 1;
    readonly LEVEL_UP_THRESHOLD: number = 6;
    readonly LEVEL_UP_FACTOR: number = 2;
    readonly MAXIMUM_LEVEL: number = 15;
    readonly BASE_STATE: GameState = {
        seed: 0,
        randomIncrement: 0,
        gameObjects: [],
        nextTetrominoes: new RotateQueue([Tetromino.I, Tetromino.J, Tetromino.L, Tetromino.O, Tetromino.S, Tetromino.T], 0),
        waitTime: 0,
        paused: false,
        effects: [],
        score: 0,
        level: 1,
        linesCleared: 0,
        gameOver: false,
        internalTick: 0,
        nextId: 0
    }

    readonly GAME_TICK_DELAY: number = 750;
}

function rand(x: number, s: number): number {
    // Weyl Sequence (?).
    const v: number = Math.exp(Math.log(Math.abs(x + s)) + 1);      // [1,inf)
    return (v - Math.floor(v));                                     // [0,1)
}

function obstructedOf(state: GameState): ReadonlyArray<Vec2> {
    return [...state.gameObjects.flatMap(o => o.sprite.occupies.map(p => o.position.add(p))),
        ...(range(0)(C.TILES_HORIZONTAL - 1).map(x => new Vec2(x, C.TILES_VERTICAL)))
        ];
}

interface Effect {
    do(backing: HTMLElement): void
}

interface Action {
    nextState(state: GameState): GameState;
}

// toString() required so that Vec2 instances can be treated like values (ie. I want (2,1) = (2,1), even if they are different instances).
// Ideally, would override comparison operator if possible.
const colliding: ((_: ReadonlyArray<Vec2>) => (__: GameObject) => boolean) = 
    (wth: ReadonlyArray<Vec2>) => (obj: GameObject) => (anyOf(
                            obj.sprite.occupies.map(p => p.add(obj.position).add(new Vec2(0,1))).map(p => p.toString())
                        )(q => difference(wth.map(p => p.toString()))(obj.sprite.occupies.map(p => p.toString())).includes(q)));

function inBounds(pos: Vec2): boolean {
    return pos.x >= 0 && pos.x < C.TILES_HORIZONTAL && pos.y >= 0 && pos.y < C.TILES_VERTICAL;
}

function validCollisions(state: GameState, obj: GameObject): boolean {
    const altState: GameState = {
        ...state,
        gameObjects: [
            ...state.gameObjects.filter(o => o !== obj)
        ]
    };
    // return !colliding(obstructedOf(altState))(obj);
    const positions: ReadonlyArray<Vec2> = obj.sprite.occupies.map(p => p.add(obj.position));
    return !anyOf(positions)(x => obstructedOf(altState).map(y => y.toString()).includes(x.toString())) && allOf(positions)(inBounds);
}

function scoreFor(rows: number, level: number = 1): number {
    switch(rows) {
        case 4:
            return 1200 * level;
        case 3:
            return 300 * level;
        case 2:
            return 100 * level;
        default:
            return 40 * level * rows;
    }
}

class DoNothing implements Action {
    public constructor() {}
    public nextState(state: GameState): GameState {
        return state;
    }
}

class Tick implements Action {
    public constructor() {}
    public nextState(state: GameState): GameState {
        return state.gameOver || state.paused ? state : (
            state.internalTick >= C.MAXIMUM_LEVEL ? this.nextStateAux({...state, internalTick: state.internalTick - C.MAXIMUM_LEVEL}) : {...state, internalTick: state.internalTick + state.level}
        );
    }
    protected nextStateAux(state: GameState): GameState {
        const fallingObjs: ReadonlyArray<GameObject> = state.gameObjects.filter(o => o.falling);
        if (fallingObjs.length > 0) {
            const obstructions: ReadonlyArray<Vec2> = obstructedOf({
                ...state,
                gameObjects: state.gameObjects.filter(o => !o.falling)
            });
            const newFallingObjs: ReadonlyArray<GameObject> = fallingObjs.filter(negate(colliding(obstructions)));
            const movedState: GameState = newFallingObjs.reduce(
                (acc, cur) => new MoveObject(
                        cur, cur.position.add(new Vec2(0, 1))
                    ).nextState(acc),
                state
            );
            const landingObjects: ReadonlyArray<GameObject> = difference(fallingObjs)(newFallingObjs);
            /* Checking rows to eliminate */
                    // Ordering is necessary, because rows of tiles get moved around with each wipe.
            const checkRows: ReadonlyArray<number> = Array.from(new Set(landingObjects.flatMap(o => o.sprite.occupies.map(p => p.add(o.position).y)))).sort(/*(a, b) => a - b*/);
            const filledLocations: ReadonlyArray<Vec2> = obstructedOf(movedState);
            const fullRows: ReadonlyArray<number> = checkRows.filter(r => filledLocations.filter(p => p.y === r).length >= C.TILES_HORIZONTAL);
            const newLinesCleared: number = state.linesCleared + fullRows.length;
            const outState: GameState = {
                ...movedState,
                gameObjects: [
                    ...(difference(movedState.gameObjects)(landingObjects)),
                    ...(landingObjects.map(
                    o => ({
                        ...o,
                        falling: false
                    })
                ))],
                score: state.score + scoreFor(fullRows.length, state.level),
                linesCleared: newLinesCleared,
                level: state.level + (newLinesCleared >= ((C.LEVEL_UP_THRESHOLD * state.level) + (C.LEVEL_UP_FACTOR * state.level)) && state.level < C.MAXIMUM_LEVEL ? 1 : 0)
            };
            return fullRows.reduce((acc, cur) => new WipeRows(cur, cur).nextState(acc), outState);
            /* Return */
        } else {
            if (state.waitTime > 0) {
                return {
                    ...state,
                    waitTime: state.waitTime - 1
                };
            } else {
                const newObj: GameObject = {
                    //id: state.gameObjects.length,
                    id: state.nextId,
                    falling: true,
                    sprite: state.nextTetrominoes.frontOf().isJust ? <Sprite> state.nextTetrominoes.frontOf().fromJust() : C.DEFAULT_SPRITE,
                    position: C.OBJECT_ORIGIN_POSITION
                };
                const outState: GameState = {
                    ...(new CreateObject(newObj).nextState(state)),
                    randomIncrement: state.randomIncrement + 1,
                    // Select a random Tetromino. Modulo not required since rand output in [0,1).
                    nextTetrominoes: state.nextTetrominoes.proceed(Tetromino.SELECT[Math.floor(rand(state.randomIncrement, state.seed) * Tetromino.SELECT.length)]),
                    waitTime: C.WAIT_TIME
                };
                return validCollisions(state, newObj) ? outState : 
                    {
                        ...state,
                        gameOver: true
                    };
            }
        }
    }
}

class CreateObject implements Action {
    public constructor(public readonly obj: GameObject) {}
    public nextState(state: GameState): GameState {
        return {
            ...state,
            gameObjects: [...state.gameObjects, (this.obj.id === state.nextId ? this.obj : {...this.obj, id: state.nextId})],
            effects: [...state.effects, new Instantiate(this.obj)],
            nextId: state.nextId + 1
        };
    }
}

class MoveObject implements Action {
    public constructor(public readonly obj: GameObject, public readonly pos: Vec2) {}
    public nextState(state: GameState): GameState {
        const outObject: GameObject = {
            ...this.obj,
            position: this.pos
        };
        const outState: GameState = {
            ...state,
            effects: [
                ...state.effects,                       // Typically, effects will be empty (regular use case where MoveObject is a unit action, not composed with
                                                        // any other Action). If you would prefer to compose Actions on Actions, this becomes useful.
                new MoveEffect(this.obj, this.pos)
            ],
            gameObjects: [
                ...state.gameObjects.filter(o => o !== this.obj),
                outObject
            ]
        };
        return validCollisions(outState, outObject) ? outState : state;
    }
}

class PauseAction implements Action {
    public constructor() {}
    public nextState(state: GameState): GameState {
        return {
            ...state,
            paused: !state.paused
        };
    }
}

class PlayerRotationAction implements Action {
    public constructor(public readonly direction: Direction) {}
    public nextState(state: GameState): GameState {
        return state.gameOver || state.paused ? state : this.nextStateAux(state);
    }
    protected nextStateAux(state: GameState): GameState {
        const objects: ReadonlyArray<GameObject> = state.gameObjects.filter(o => o.falling);
        const transformation: Transformation = new Rotation(this.direction);
        return objects.reduce(
            (acc: GameState, val: GameObject) => new Transform(transformation, val).nextState(acc),
            state
        )
    }
}

class PlayerTranslationAction implements Action {
    public constructor(public readonly direction: Vec2) {}
    public nextState(state: GameState): GameState {
        return state.gameOver || state.paused ? state : this.nextStateAux(state);
    }
    protected nextStateAux(state: GameState): GameState {
        const objects: ReadonlyArray<GameObject> = state.gameObjects.filter(o => o.falling);
        return objects.reduce(
            (acc: GameState, val: GameObject) => new MoveObject(val, val.position.add(this.direction)).nextState(acc),
            state
        )
    }
}

class Transform implements Action {
    public constructor(public readonly transformation: Transformation, public readonly obj: GameObject) {}
    public nextState(state: GameState): GameState {
        const outObject: GameObject = {
            ...this.obj,
            sprite: this.transformation.transform(this.obj.sprite)
        };
        const outState: GameState = {
            ...state,
            effects: [...state.effects, this.transformation.getEffect(this.obj)],
            gameObjects: [
                ...state.gameObjects.filter(o => o !== this.obj),
                outObject
            ]
        };
        return validCollisions(outState, outObject) ? outState : state;
    }
}

interface Transformation {
    transform(sprite: Sprite): Sprite
    getEffect(obj: GameObject): Effect
}

/*
    The Rotation class. An instance of Rotation describes a particular
    rotation around a given axis or 'origin'.
*/
class Rotation implements Transformation {
    private readonly rotMat: [Vec2, Vec2]
    public constructor(public readonly motion: number, public readonly origin: Vec2 = Vec2.ZERO) {
        this.rotMat = [new Vec2(Math.cos(motion * Math.PI / 2), Math.sin(motion * Math.PI / 2)), new Vec2(-1 * Math.sin(motion * Math.PI / 2), Math.cos(motion * Math.PI / 2))]
    }
    public takesTo(origin: Vec2 = this.origin): ((_:Vec2) => Vec2) {
        return ((v: Vec2) => {
                const p: Vec2 = v.subt(origin);
                return (new Vec2(Math.round((this.rotMat[0].x * p.x) + (this.rotMat[1].x * p.y)),
                        Math.round((this.rotMat[0].y * p.x) + (this.rotMat[1].y * p.y))))
                    .add(this.origin);
            });
    }
    public transform(sprite: Sprite): Sprite {
        return {
            ...sprite,
            occupies: sprite.occupies.map(this.takesTo())
        };
    }
    public getEffect(obj: GameObject): Effect {
        return new TransformEffect(obj, this.takesTo());
    }
}

class WipeRows implements Action {
    public constructor(public readonly low: number, public readonly high: number) {}
    public nextState(state: GameState): GameState {
        const nonFixedObjects: ReadonlyArray<GameObject> = state.gameObjects.filter(o => o.falling);
        const fixedObjects: ReadonlyArray<GameObject> = difference(state.gameObjects)(nonFixedObjects).map(obj => ({
                ...obj,
                sprite: {
                    ...obj.sprite,
                    // Retain only the non-affected rows.
                    occupies: obj.sprite.occupies.filter(p => p.add(obj.position).y < this.low || p.add(obj.position).y > this.high).
                    // Everything above the bound is dropped by the difference.
                    map(p => p.add(obj.position).y < this.low ? p.add(new Vec2(0, this.high - this.low + 1)) : p)
                }
            })
        );
        return {
            ...state,
            gameObjects: [...nonFixedObjects, ...fixedObjects].filter(o => o.sprite.occupies.length > 0),   // Exclude empty GameObjects.
            effects: [...state.effects, new RefreshDrawObjects(fixedObjects)]
        };
    }
}

const reduceState: ((_: GameState, __: Action) => GameState) = (state: GameState, action: Action) => 
    action instanceof DoNothing ?   action.nextState(state) : 
                                    action.nextState(
                                        { ...state,
                                            effects: []
                                        }
                                    );

function main(): void {
    const backing: Maybe<HTMLElement> = new Maybe<HTMLElement>(document.getElementById(C.BACKDROP_ID));
    backing.fmap(bcking => {
        const ticks$: Observable<Action> = interval(C.GAME_TICK_DELAY / C.MAXIMUM_LEVEL).pipe(
            map(() => new Tick()),
            startWith(new DoNothing())
        );
        const rotInputW$: Observable<Action> = fromEvent<KeyboardEvent>(document, "keydown").pipe(
            filter(e => e.key === 'q'),
            map(_ => new PlayerRotationAction(Direction.ANTICLOCKWISE))
        );
        const rotInputS$: Observable<Action> = fromEvent<KeyboardEvent>(document, "keydown").pipe(
            filter(e => e.key === 'e'),
            map(_ => new PlayerRotationAction(Direction.CLOCKWISE))
        );
        const movInputA$: Observable<Action> = fromEvent<KeyboardEvent>(document, "keydown").pipe(
            filter(e => e.key === 'a'),
            map(_ => new PlayerTranslationAction(new Vec2(-1, 0)))
        );
        const movInputD$: Observable<Action> = fromEvent<KeyboardEvent>(document, "keydown").pipe(
            filter(e => e.key === 'd'),
            map(_ => new PlayerTranslationAction(new Vec2(1, 0)))
        );
        const fastForwardInput$: Observable<Action> = fromEvent<KeyboardEvent>(document, "keydown").pipe(
            filter(e => e.key === 's'),
            map(_ => new PlayerTranslationAction(new Vec2(0, 1)))
        );
        const pauseInput$: Observable<Action> = fromEvent<KeyboardEvent>(document, "keydown").pipe(
            filter(e => e.key === 'p'),
            map(_ => new PauseAction())
        );

        const game$: Observable<GameState> = merge(
            ticks$,
            rotInputW$,
            rotInputS$,
            movInputA$,
            movInputD$,
            fastForwardInput$,
            pauseInput$
        ).pipe(
            // NOTE: Impurity in the code: new Date().getTime() is not pure, and this is not contained within a subscribe call.
            scan<Action, GameState>(reduceState, {...C.BASE_STATE, seed: new Date().getTime()})
        );
        game$.subscribe(output(bcking));
    })
}

if (typeof window != 'undefined') {
    window.onload = main;
}

export { GameState, GameObject, Vec2, Effect, C, Sprite, RotateQueue }