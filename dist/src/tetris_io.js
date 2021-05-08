import { C } from "./tetris";
import { ObjectBag, SVGRectangle } from "./graphics";
function output(backing) {
    return (function (state) {
        state.effects.forEach(function (e) { return e.do(backing); });
    });
}
var Instantiate = /** @class */ (function () {
    function Instantiate(obj) {
        this.obj = obj;
    }
    Instantiate.prototype.do = function (backing) {
        var _this = this;
        var components = this.obj.occupies.map(function (v) { return new SVGRectangle(backing, v.add(_this.obj.position), C.TILE_WIDTH, C.TILE_HEIGHT, _this.obj.colour); });
        new ObjectBag(this.obj.id, this.obj.position, components);
    };
    return Instantiate;
}());
var MoveEffect = /** @class */ (function () {
    function MoveEffect(obj, pos) {
        this.obj = obj;
        this.pos = pos;
    }
    MoveEffect.prototype.do = function (_) {
        var _this = this;
        ObjectBag.getObjectBag(this.obj.id).fmap(function (o) { return o.setPosition(_this.pos); });
    };
    return MoveEffect;
}());
export { output, Instantiate, MoveEffect };
//# sourceMappingURL=tetris_io.js.map