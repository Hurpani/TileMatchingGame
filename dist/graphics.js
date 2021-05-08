define(["require", "exports", "./base/maybe"], function (require, exports, maybe_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObjectBag = exports.SVGRectangle = exports.Colour = exports.SVGShape = void 0;
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
    exports.Colour = Colour;
    var SVGShape;
    (function (SVGShape) {
        SVGShape["RECT"] = "rect";
        SVGShape["CIRCLE"] = "circle";
        SVGShape["ELLIPSE"] = "ellipse";
        SVGShape["LINE"] = "line";
        SVGShape["POLYGON"] = "polygon";
    })(SVGShape || (SVGShape = {}));
    exports.SVGShape = SVGShape;
    const DEFAULT_STROKE = Colour.BLACK;
    const DEFAULT_FILL = Colour.WHITE;
    const DEFAULT_STROKE_WIDTH = 1;
    const createSVG = (parent) => (svgShape) => (attribValuePairs) => {
        const svgObj = document.createElementNS(parent.namespaceURI, svgShape);
        attribValuePairs.forEach((element) => svgObj.setAttribute(element[0], String(element[1])));
        parent.appendChild(svgObj);
        return svgObj;
    };
    function createRect(parent, width, height, fill = DEFAULT_FILL, x = 0, y = 0, strokeWidth = DEFAULT_STROKE_WIDTH) {
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
    class SVGRectangle {
        constructor(parent, pos, width, height, fill) {
            this.parent = parent;
            this.pos = pos;
            this.alive = true;
            this.obj = createRect(parent, width, height, fill, pos.x, pos.y);
        }
        getPosition() {
            return this.pos;
        }
        setPosition(pos) {
            if (this.alive) {
                this.obj.setAttribute("x", String(pos.x));
                this.obj.setAttribute("y", String(pos.y));
            }
            this.pos = pos;
        }
        destroy() {
            if (this.alive) {
                this.parent.removeChild(this.obj);
                this.alive = false;
            }
        }
        isAlive() {
            return this.alive;
        }
    }
    exports.SVGRectangle = SVGRectangle;
    class ObjectBag {
        /* id must be unique, or you will be unable to retrieve subsequent bags. */
        constructor(id, pos, _svgElements) {
            this.id = id;
            this.pos = pos;
            this.svgObjects = [..._svgElements];
            ObjectBag.objectBags = [...ObjectBag.objectBags, this];
        }
        static getObjectBag(id) {
            const bags = ObjectBag.objectBags.filter(o => o.id == id);
            return (bags.length > 0) ? new maybe_1.Maybe(bags[0]) : maybe_1.nothing();
        }
        getPosition() {
            return this.pos;
        }
        getID() {
            return this.id;
        }
        setPosition(to) {
            const dif = to.subt(this.pos);
            this.svgObjects = this.svgObjects.filter(o => o.isAlive());
            this.svgObjects.forEach(o => o.getPosition().add(dif));
            this.pos = to;
        }
        getLiveObjects() {
            return this.svgObjects.filter(o => o.isAlive());
        }
    }
    exports.ObjectBag = ObjectBag;
    ObjectBag.objectBags = [];
});
//# sourceMappingURL=graphics.js.map