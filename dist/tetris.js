define(["require", "exports", "./base/maybe", "./graphics", "./tetris_io"], function (require, exports, maybe_1, graphics_1, tetris_io_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C = exports.Vec2 = void 0;
    const C = new class {
        constructor() {
            ///--- Backing ---///
            this.BACKDROP_ID = "backdrop";
            this.PIXEL_WIDTH = 720;
            this.PIXEL_HEIGHT = 1280;
            this.TILES_HORIZONTAL = 10;
            this.TILES_VERTICAL = 40;
            this.TILE_WIDTH = this.PIXEL_WIDTH / this.TILES_HORIZONTAL;
            this.TILE_HEIGHT = this.PIXEL_HEIGHT / this.TILES_VERTICAL;
            /// ---        --- ///
            this.BASE_STATE = {
                seed: 0,
                gameObjects: [],
                waitTime: 0,
                paused: false,
                nextGameObjects: [],
                effects: []
            };
        }
    };
    exports.C = C;
    function rand(x, s) {
        // Weyl Sequence (?).
        const v = Math.exp(Math.log(Math.abs(x + s)) + 1);
        return (v - Math.floor(v));
    }
    class MoveObject {
        constructor(obj, pos) {
            this.obj = obj;
            this.pos = pos;
        }
        nextState(state) {
            return {
                ...state,
                effects: [
                    ...state.effects,
                    // any other Action). If you would prefer to compose Actions on Actions, this becomes useful.
                    new tetris_io_1.MoveEffect(this.obj, this.pos)
                ],
                gameObjects: [
                    ...state.gameObjects.filter(o => o !== this.obj), {
                        ...this.obj,
                        position: this.pos
                    }
                ]
            };
        }
    }
    class Vec2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.add = (other) => new Vec2(this.x + other.x, this.y + other.y);
            this.subt = (other) => new Vec2(this.x - other.x, this.y - other.y);
            this.mult = (val) => new Vec2(this.x * val, this.y * val);
            this.altX = (x) => new Vec2(x, this.y);
            this.altY = (y) => new Vec2(this.x, y);
        }
    }
    exports.Vec2 = Vec2;
    const reduceState = (state, action) => action.nextState({ ...state,
        effects: []
    });
    function main() {
        const backing = new maybe_1.Maybe(document.getElementById(C.BACKDROP_ID));
        // backing.fmap(bcking => {
        //     const actions$: Observable<Action> = EMPTY;
        //     const game$: Observable<GameState> = actions$.pipe(
        //         scan<Action, GameState>(reduceState, C.BASE_STATE)  // TODO: We don't want to use the base state, we need to tweak it somewhat.
        //     );
        //     game$.subscribe(output(bcking));
        // })
        console.log("ya yeet");
        tetris_io_1.output(backing.fromJust())({
            seed: 0,
            gameObjects: [
                {
                    id: 1,
                    falling: true,
                    occupies: [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2)],
                    colour: graphics_1.Colour.RED,
                    position: new Vec2(2, 3)
                }
            ],
            waitTime: 0,
            paused: false,
            nextGameObjects: [],
            effects: [
                new tetris_io_1.Instantiate({
                    id: 1,
                    falling: true,
                    occupies: [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2)],
                    colour: graphics_1.Colour.RED,
                    position: new Vec2(2, 3)
                })
            ]
        });
    }
    if (typeof window != 'undefined') {
        window.onload = main;
    }
});
//# sourceMappingURL=tetris.js.map