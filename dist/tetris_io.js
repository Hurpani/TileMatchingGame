define(["require", "exports", "./tetris", "./graphics"], function (require, exports, tetris_1, graphics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MoveEffect = exports.Instantiate = exports.output = void 0;
    function coordsToPixelPos(coords) {
        return new tetris_1.Vec2(coords.x * tetris_1.C.TILE_WIDTH, coords.y * tetris_1.C.TILE_HEIGHT);
    }
    function output(backing) {
        return ((state) => {
            state.effects.forEach(e => e.do(backing));
        });
    }
    exports.output = output;
    class Instantiate {
        constructor(obj) {
            this.obj = obj;
        }
        do(backing) {
            const components = this.obj.occupies.map(v => new graphics_1.SVGRectangle(backing, v.add(this.obj.position), tetris_1.C.TILE_WIDTH, tetris_1.C.TILE_HEIGHT, this.obj.colour));
            new graphics_1.ObjectBag(this.obj.id, this.obj.position, components);
        }
    }
    exports.Instantiate = Instantiate;
    class MoveEffect {
        constructor(obj, pos) {
            this.obj = obj;
            this.pos = pos;
        }
        do(_) {
            graphics_1.ObjectBag.getObjectBag(this.obj.id).fmap(o => o.setPosition(this.pos));
        }
    }
    exports.MoveEffect = MoveEffect;
});
//# sourceMappingURL=tetris_io.js.map