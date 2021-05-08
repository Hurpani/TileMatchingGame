// import { interval, fromEvent, Observable, EMPTY } from "rxjs";
// import { map, scan, filter, merge } from "rxjs/operators";
// import { Maybe, nothing } from "./base/maybe";
// import { Colour } from "./graphics";
// import { Instantiate, MoveEffect, output } from "./tetris_io";
// const C = new class {
//     ///--- Backing ---///
//     readonly BACKDROP_ID: string = "backdrop";
//     readonly PIXEL_WIDTH: number = 720;
//     readonly PIXEL_HEIGHT: number = 1280;
//     readonly TILES_HORIZONTAL: number = 10;
//     readonly TILES_VERTICAL: number = 40;
//     readonly TILE_WIDTH: number = this.PIXEL_WIDTH / this.TILES_HORIZONTAL;
//     readonly TILE_HEIGHT: number = this.PIXEL_HEIGHT / this.TILES_VERTICAL;
//     /// ---        --- ///
//     readonly BASE_STATE: GameState = {
//         seed: 0,
//         gameObjects: [],
//         waitTime: 0,
//         paused: false,
//         nextGameObjects: [],
//         effects: []
//     }
// }
// function rand(x: number, s: number): number {
//     // Weyl Sequence (?).
//     const v: number = Math.exp(Math.log(Math.abs(x + s)) + 1);
//     return (v - Math.floor(v));
// }
// interface Effect {
//     do(backing: HTMLElement): void
// }
// interface Action {
//     nextState(state: GameState): GameState;
// }
// class MoveObject implements Action {
//     public constructor(public readonly obj: GameObject, public readonly pos: Vec2) {}
//     nextState(state: GameState) {
//         return {
//             ...state,
//             effects: [
//                 ...state.effects,       // Typically, effects will be empty (regular use case where MoveObject is a unit action, not composed with
//                                         // any other Action). If you would prefer to compose Actions on Actions, this becomes useful.
//                 new MoveEffect(this.obj, this.pos)
//             ],
//             gameObjects: [
//                 ...state.gameObjects.filter(o => o !== this.obj), {
//                     ...this.obj,
//                     position: this.pos
//                 }
//             ]
//         };
//     }
// }
// class Vec2 {
//     public constructor(public readonly x: number, public readonly y: number) {}
//     public add = (other: Vec2) => new Vec2(this.x + other.x, this.y + other.y);
//     public subt = (other: Vec2) => new Vec2(this.x - other.x, this.y - other.y)
//     public mult = (val: number) => new Vec2(this.x * val, this.y * val);
//     public altX = (x: number) => new Vec2(x, this.y);
//     public altY = (y: number) => new Vec2(this.x, y);
// }
// type GameObject = Readonly<{
//     id: number,
//     falling: boolean,
//     occupies: Array<Vec2>,
//     colour: Colour,
//     position: Vec2
// }>;
// type GameState = Readonly<{
//     seed: number,
//     gameObjects: Array<GameObject>,
//     waitTime: number,
//     paused: boolean,
//     nextGameObjects: Array<GameObject>,
//     effects: Array<Effect>
// }>;
// const reduceState: ((_: GameState, __: Action) => GameState) = (state: GameState, action: Action) => action.nextState(
//     { ...state,
//          effects: []
//     }
// );
// function main(): void {
//     const backing: Maybe<HTMLElement> = new Maybe<HTMLElement>(document.getElementById(C.BACKDROP_ID));
//     // backing.fmap(bcking => {
//     //     const actions$: Observable<Action> = EMPTY;
//     //     const game$: Observable<GameState> = actions$.pipe(
//     //         scan<Action, GameState>(reduceState, C.BASE_STATE)  // TODO: We don't want to use the base state, we need to tweak it somewhat.
//     //     );
//     //     game$.subscribe(output(bcking));
//     // })
//     console.log("ya yeet");
//     output(backing.fromJust())({
//         seed: 0,
//         gameObjects: [
//             {
//                 id: 1,
//                 falling: true,
//                 occupies: [new Vec2(0,0), new Vec2(0,1), new Vec2(0,2)],
//                 colour: Colour.RED,
//                 position: new Vec2(2,3)
//             }
//         ],
//         waitTime: 0,
//         paused: false,
//         nextGameObjects: [],
//         effects: [
//             new Instantiate({
//                 id: 1,
//                 falling: true,
//                 occupies: [new Vec2(0,0), new Vec2(0,1), new Vec2(0,2)],
//                 colour: Colour.RED,
//                 position: new Vec2(2,3)
//             })
//         ]
//     });
// }
// if (typeof window != 'undefined') {
//     window.onload = main;
// }
// export { GameState, GameObject, Vec2, Effect, C }
function main() {
    console.log("yeet");
}
if (typeof window != 'undefined') {
    window.onload = main;
}
