var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Maybe, nothing } from "./base/maybe";
import { C, Vec2 } from "./tetris";
var Colour;
(function (Colour) {
    Colour["WHITE"] = "rgb(255, 255, 255)";
    Colour["BLACK"] = "rgb(0, 0, 0)";
    Colour["RED"] = "rgb(240, 20, 20)";
    Colour["GREEN"] = "rgb(20, 240, 20)";
    Colour["BLUE"] = "rgb(20, 20, 240)";
    Colour["CYAN"] = "rgb(65, 205, 230)";
    Colour["MAGENTA"] = "rgb(230, 65, 205)";
    Colour["YELLOW"] = "rgb(230, 205, 65)";
})(Colour || (Colour = {}));
var SVGShape;
(function (SVGShape) {
    SVGShape["RECT"] = "rect";
    SVGShape["CIRCLE"] = "circle";
    SVGShape["ELLIPSE"] = "ellipse";
    SVGShape["LINE"] = "line";
    SVGShape["POLYGON"] = "polygon";
})(SVGShape || (SVGShape = {}));
var DEFAULT_STROKE = Colour.BLACK;
var DEFAULT_FILL = Colour.WHITE;
var DEFAULT_STROKE_WIDTH = 1;
var createSVG = function (parent) { return function (svgShape) { return function (attribValuePairs) {
    var svgObj = document.createElementNS(parent.namespaceURI, svgShape);
    attribValuePairs.forEach(function (element) { return svgObj.setAttribute(element[0], String(element[1])); });
    parent.appendChild(svgObj);
    return svgObj;
}; }; };
function coordsToPixelPos(coords) {
    return new Vec2(coords.x * C.TILE_WIDTH, coords.y * C.TILE_HEIGHT);
}
function createRect(parent, width, height, fill, x, y, strokeWidth) {
    if (fill === void 0) { fill = DEFAULT_FILL; }
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (strokeWidth === void 0) { strokeWidth = DEFAULT_STROKE_WIDTH; }
    return createSVG(parent)(SVGShape.RECT)([
        ["width", width],
        ["height", height],
        ["fill", fill],
        ["stroke-width", strokeWidth],
        ["stroke", DEFAULT_STROKE],
        ["x", x],
        ["y", y]
        /* // Centering:
        ["x", (x - width - strokeWidth)/2],
        ["y", (y - height - strokeWidth)/2]
        */
    ]);
}
var SVGRectangle = /** @class */ (function () {
    function SVGRectangle(parent, pos, width, height, fill) {
        this.parent = parent;
        this.pos = pos;
        this.alive = true;
        this.obj = createRect(parent, width, height, fill, pos.x, pos.y);
    }
    SVGRectangle.prototype.getPosition = function () {
        return this.pos;
    };
    SVGRectangle.prototype.setPosition = function (pos) {
        if (this.alive) {
            this.obj.setAttribute("x", String(coordsToPixelPos(pos).x));
            this.obj.setAttribute("y", String(coordsToPixelPos(pos).y));
        }
        this.pos = pos;
    };
    SVGRectangle.prototype.destroy = function () {
        if (this.alive) {
            this.parent.removeChild(this.obj);
            this.alive = false;
        }
    };
    SVGRectangle.prototype.isAlive = function () {
        return this.alive;
    };
    return SVGRectangle;
}());
var ObjectBag = /** @class */ (function () {
    /* id must be unique, or you will be unable to retrieve subsequent bags. */
    function ObjectBag(id, pos, _svgElements) {
        this.id = id;
        this.pos = pos;
        this.svgObjects = __spreadArrays(_svgElements);
        ObjectBag.objectBags = __spreadArrays(ObjectBag.objectBags, [this]);
    }
    ObjectBag.getObjectBag = function (id) {
        var bags = ObjectBag.objectBags.filter(function (o) { return o.id == id; });
        return (bags.length > 0) ? new Maybe(bags[0]) : nothing();
    };
    ObjectBag.prototype.getPosition = function () {
        return this.pos;
    };
    ObjectBag.prototype.getID = function () {
        return this.id;
    };
    ObjectBag.prototype.setPosition = function (to) {
        var dif = coordsToPixelPos(to.subt(this.pos));
        this.svgObjects = this.svgObjects.filter(function (o) { return o.isAlive(); });
        this.svgObjects.forEach(function (o) { return o.getPosition().add(dif); });
        this.pos = to;
    };
    ObjectBag.prototype.getLiveObjects = function () {
        return this.svgObjects.filter(function (o) { return o.isAlive(); });
    };
    ObjectBag.objectBags = [];
    return ObjectBag;
}());
export { SVGShape, Colour, SVGRectangle, ObjectBag };
//# sourceMappingURL=graphics.js.map