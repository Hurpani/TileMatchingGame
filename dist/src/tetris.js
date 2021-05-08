var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// import { interval, fromEvent, Observable, EMPTY } from "rxjs";
// import { map, scan, filter, merge } from "rxjs/operators";
import { Maybe } from "./base/maybe";
import { Colour } from "./graphics";
import { Instantiate, MoveEffect, output } from "./tetris_io";
var C = new /** @class */ (function () {
    function class_1() {
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
    return class_1;
}());
function rand(x, s) {
    // Weyl Sequence (?).
    var v = Math.exp(Math.log(Math.abs(x + s)) + 1);
    return (v - Math.floor(v));
}
var MoveObject = /** @class */ (function () {
    function MoveObject(obj, pos) {
        this.obj = obj;
        this.pos = pos;
    }
    MoveObject.prototype.nextState = function (state) {
        var _this = this;
        return __assign(__assign({}, state), { effects: __spreadArrays(state.effects, [
                // any other Action). If you would prefer to compose Actions on Actions, this becomes useful.
                new MoveEffect(this.obj, this.pos)
            ]), gameObjects: __spreadArrays(state.gameObjects.filter(function (o) { return o !== _this.obj; }), [
                __assign(__assign({}, this.obj), { position: this.pos })
            ]) });
    };
    return MoveObject;
}());
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.add = function (other) { return new Vec2(_this.x + other.x, _this.y + other.y); };
        this.subt = function (other) { return new Vec2(_this.x - other.x, _this.y - other.y); };
        this.mult = function (val) { return new Vec2(_this.x * val, _this.y * val); };
        this.altX = function (x) { return new Vec2(x, _this.y); };
        this.altY = function (y) { return new Vec2(_this.x, y); };
    }
    return Vec2;
}());
var reduceState = function (state, action) { return action.nextState(__assign(__assign({}, state), { effects: [] })); };
function main() {
    var backing = new Maybe(document.getElementById(C.BACKDROP_ID));
    // backing.fmap(bcking => {
    //     const actions$: Observable<Action> = EMPTY;
    //     const game$: Observable<GameState> = actions$.pipe(
    //         scan<Action, GameState>(reduceState, C.BASE_STATE)  // TODO: We don't want to use the base state, we need to tweak it somewhat.
    //     );
    //     game$.subscribe(output(bcking));
    // })
    console.log("ya yeet");
    output(backing.fromJust())({
        seed: 0,
        gameObjects: [
            {
                id: 1,
                falling: true,
                occupies: [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(1, 1)],
                colour: Colour.RED,
                position: new Vec2(4, 5)
            }
        ],
        waitTime: 0,
        paused: false,
        nextGameObjects: [],
        effects: [
            new Instantiate({
                id: 1,
                falling: true,
                occupies: [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(1, 1)],
                colour: Colour.RED,
                position: new Vec2(4, 5)
            })
        ]
    });
}
if (typeof window != 'undefined') {
    window.onload = main;
}
export { Vec2, C };
//# sourceMappingURL=tetris.js.map