import { Maybe, nothing } from "./base/maybe";
import { C, Vec2 } from "./tetris";

enum Colour {
    WHITE = "rgb(255, 255, 255)",
    BLACK = "rgb(0, 0, 0)",
    RED = "rgb(240, 20, 20)",
    GREEN = "rgb(20, 240, 20)",
    BLUE = "rgb(20, 20, 240)",
    CYAN = "rgb(65, 205, 230)",
    MAGENTA = "rgb(230, 65, 205)",
    YELLOW = "rgb(230, 205, 65)",
    ORANGE = "rgb(240, 165, 0)"
}

enum SVGShape {
    RECT = "rect",
    CIRCLE = "circle",
    ELLIPSE = "ellipse",
    LINE = "line",
    POLYGON = "polygon"
}

const DEFAULT_STROKE: Colour = Colour.BLACK;
const DEFAULT_FILL: Colour = Colour.WHITE;
const DEFAULT_STROKE_WIDTH: number = 1;

type AttribValuePair = [string, number | string];

const createSVG:(   (_:HTMLElement) => (__:SVGShape) => (___:AttribValuePair[]) => Element  ) =
    (parent: HTMLElement) => (svgShape: SVGShape) => (attribValuePairs: AttribValuePair[]) => {
        const svgObj: Element = document.createElementNS(parent.namespaceURI, svgShape);
        attribValuePairs.forEach(
            (element: AttribValuePair) => svgObj.setAttribute(element[0], String(element[1]))
        );
        parent.appendChild(svgObj);
        return svgObj;
    }

function coordsToPixelPos(coords: Vec2): Vec2 {
    return new Vec2(coords.x * C.TILE_WIDTH, (coords.y * C.TILE_HEIGHT) + C.PIXEL_VERTICAL_OFFSET);
}

function pixelPosToCoords(pixelPos: Vec2): Vec2 {
    return new Vec2(pixelPos.x / C.TILE_WIDTH, (pixelPos.y - C.PIXEL_VERTICAL_OFFSET) / C.TILE_HEIGHT);
}

function createRect(parent: HTMLElement, width: number, height: number, fill: Colour = DEFAULT_FILL,
    x: number = 0, y: number = 0, strokeWidth: number = DEFAULT_STROKE_WIDTH): Element {
    return createSVG(parent)(SVGShape.RECT)(
        [
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
        ]
    );
}

class SVGRectangle implements SVGObject {
    private obj: Element;
    private alive: boolean = true;
    
    public constructor(private parent: HTMLElement, private pos: Vec2, width: number, height: number, fill: Colour) {
        this.obj = createRect(parent, width, height, fill, coordsToPixelPos(pos).x, coordsToPixelPos(pos).y);
    }
    public getPosition() {
        return this.pos;
    }
    public setPosition(pos: Vec2) {
        if (this.alive) {
            this.obj.setAttribute("x", String(coordsToPixelPos(pos).x));
            this.obj.setAttribute("y", String(coordsToPixelPos(pos).y));
        }
        this.pos = pos;
    }
    public destroy() {
        if (this.alive) {
            this.parent.removeChild(this.obj);
            this.alive = false;
        }
    }
    public isAlive() {
        return this.alive;
    }
}

interface SVGObject {
    getPosition(): Vec2;
    setPosition(pos: Vec2): void;
    destroy(): void;
    isAlive(): boolean;
}

class ObjectBag {
    private static objectBags: Array<ObjectBag> = []
    private bringOutYourDead() {
        // Removes dead objects from this bag.
        this.svgObjects = this.svgObjects.filter(o => o.isAlive());
    }

    public static getObjectBag(id: number): Maybe<ObjectBag> {
        const bags: Array<ObjectBag> = ObjectBag.objectBags.filter(o => o.id == id);
        return (bags.length > 0) ? new Maybe(bags[0]) : nothing();
    }
    /* IMPORTANT: Removes a reference to the ObjectBag, but does not destroy it. You should
       destroy its component SVGObjects first if you wish to delete them. */
    public static forgetObjectBag(id: number): void {
        ObjectBag.objectBags = ObjectBag.objectBags.filter(bg => bg.id !== id);
    }

    private svgObjects: Array<SVGObject>;

    /* id must be unique, or you will be unable to retrieve subsequent bags. */
    public constructor(private id: number, private pos: Vec2, _svgObjects: Array<SVGObject>) {
        this.svgObjects = [..._svgObjects];
        ObjectBag.objectBags = [...ObjectBag.objectBags, this];
    }
    public addObjects(_svgObjects: Array<SVGObject>) {
        this.svgObjects = [...this.svgObjects, ..._svgObjects];
    }
    public getPosition() {
        return this.pos;
    }
    public getID() {
        return this.id;
    }
    public setPosition(to: Vec2) {
        const dif: Vec2 = to.subt(this.pos);
        this.bringOutYourDead();
        this.svgObjects.forEach(o => o.setPosition(o.getPosition().add(dif)));
        this.pos = to;
    }
    /* 
        The transformer operates on relative coordinates ~ the position
        given for this ObjectBag is (0,0), wherever it is in the scene.
    */
    public transform(transformer: ((_:Vec2) => Vec2)) {
        this.bringOutYourDead();
        this.svgObjects.forEach(o => o.setPosition(
            transformer(
                o.getPosition().subt(this.pos)).add(this.pos)
            )
        );
    }
    public getLiveObjects() {
        return this.svgObjects.filter(o => o.isAlive());
    }
}

export { SVGShape, AttribValuePair, Colour, SVGObject, SVGRectangle, ObjectBag, pixelPosToCoords }