/******/ (function (modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/ }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/ 
        };
        /******/
        /******/ // Execute the module function
        /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/ module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function (exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/ }
        /******/ 
    };
    /******/
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function (exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
        /******/ if (mode & 1)
            value = __webpack_require__(value);
        /******/ if (mode & 8)
            return value;
        /******/ if ((mode & 4) && typeof value === 'object' && value && value.__esModule)
            return value;
        /******/ var ns = Object.create(null);
        /******/ __webpack_require__.r(ns);
        /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/ if (mode & 2 && typeof value != 'string')
            for (var key in value)
                __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
        /******/ return ns;
        /******/ 
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function (module) {
        /******/ var getter = module && module.__esModule ?
            /******/ function getDefault() { return module['default']; } :
            /******/ function getModuleExports() { return module; };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/ 
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = "";
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__(__webpack_require__.s = "./src/tetris.ts");
    /******/ 
})({
    /***/ "./src/base/maybe.ts": 
    /*!***************************!*\
      !*** ./src/base/maybe.ts ***!
      \***************************/
    /*! exports provided: Maybe, nothing */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Maybe", function () { return Maybe; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nothing", function () { return nothing; });
        var NOTHING_STRING = "Nothing";
        var JUST_STRING = "Just ";
        var Maybe = /** @class */ (function () {
            function Maybe(obj) {
                var _this = this;
                this.fromJust = function () { return _this.obj; }; // this.isJust ? this.obj : undefined; // <T>this.obj; ~ this is the partial alternative.
                this.fromMaybe = function (deflt) { return _this.isJust ? _this.obj : deflt; };
                this.fmap = function (f) {
                    return _this.isJust ? new Maybe(f(_this.obj)) : nothing();
                };
                this.apply = function (mb) {
                    return mb.isJust ? _this.fmap(mb.fromJust()) : nothing();
                };
                this.bind = function (f) { return _this.isJust ? f(_this.fromJust()) : nothing(); };
                this.toString = function () { return _this.isJust ? JUST_STRING.concat(String(_this.obj)) : NOTHING_STRING; };
                this.isJust = obj !== null && obj !== undefined;
                this.obj = this.isJust ? obj : undefined;
            }
            return Maybe;
        }());
        function nothing() {
            return new Maybe();
        }
        /***/ 
    }),
    /***/ "./src/graphics.ts": 
    /*!*************************!*\
      !*** ./src/graphics.ts ***!
      \*************************/
    /*! exports provided: SVGShape, Colour, SVGRectangle, ObjectBag */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGShape", function () { return SVGShape; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colour", function () { return Colour; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGRectangle", function () { return SVGRectangle; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectBag", function () { return ObjectBag; });
        /* harmony import */ var _base_maybe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/maybe */ "./src/base/maybe.ts");
        /* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetris */ "./src/tetris.ts");
        var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++)
                s += arguments[i].length;
            for (var r = Array(s), k = 0, i = 0; i < il; i++)
                for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                    r[k] = a[j];
            return r;
        };
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
        var createSVG = function (parent) {
            return function (svgShape) {
                return function (attribValuePairs) {
                    var svgObj = document.createElementNS(parent.namespaceURI, svgShape);
                    attribValuePairs.forEach(function (element) { return svgObj.setAttribute(element[0], String(element[1])); });
                    parent.appendChild(svgObj);
                    return svgObj;
                };
            };
        };
        function coordsToPixelPos(coords) {
            return new _tetris__WEBPACK_IMPORTED_MODULE_1__["Vec2"](coords.x * _tetris__WEBPACK_IMPORTED_MODULE_1__["C"].TILE_WIDTH, coords.y * _tetris__WEBPACK_IMPORTED_MODULE_1__["C"].TILE_HEIGHT);
        }
        function createRect(parent, width, height, fill, x, y, strokeWidth) {
            if (fill === void 0) {
                fill = DEFAULT_FILL;
            }
            if (x === void 0) {
                x = 0;
            }
            if (y === void 0) {
                y = 0;
            }
            if (strokeWidth === void 0) {
                strokeWidth = DEFAULT_STROKE_WIDTH;
            }
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
                return (bags.length > 0) ? new _base_maybe__WEBPACK_IMPORTED_MODULE_0__["Maybe"](bags[0]) : Object(_base_maybe__WEBPACK_IMPORTED_MODULE_0__["nothing"])();
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
        /***/ 
    }),
    /***/ "./src/tetris.ts": 
    /*!***********************!*\
      !*** ./src/tetris.ts ***!
      \***********************/
    /*! exports provided: Vec2, C */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec2", function () { return Vec2; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function () { return C; });
        /* harmony import */ var _base_maybe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/maybe */ "./src/base/maybe.ts");
        /* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphics */ "./src/graphics.ts");
        /* harmony import */ var _tetris_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tetris_io */ "./src/tetris_io.ts");
        var __assign = (undefined && undefined.__assign) || function () {
            __assign = Object.assign || function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++)
                s += arguments[i].length;
            for (var r = Array(s), k = 0, i = 0; i < il; i++)
                for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                    r[k] = a[j];
            return r;
        };
        // import { interval, fromEvent, Observable, EMPTY } from "rxjs";
        // import { map, scan, filter, merge } from "rxjs/operators";
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
                        new _tetris_io__WEBPACK_IMPORTED_MODULE_2__["MoveEffect"](this.obj, this.pos)
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
            var backing = new _base_maybe__WEBPACK_IMPORTED_MODULE_0__["Maybe"](document.getElementById(C.BACKDROP_ID));
            // backing.fmap(bcking => {
            //     const actions$: Observable<Action> = EMPTY;
            //     const game$: Observable<GameState> = actions$.pipe(
            //         scan<Action, GameState>(reduceState, C.BASE_STATE)  // TODO: We don't want to use the base state, we need to tweak it somewhat.
            //     );
            //     game$.subscribe(output(bcking));
            // })
            console.log("ya yeet");
            Object(_tetris_io__WEBPACK_IMPORTED_MODULE_2__["output"])(backing.fromJust())({
                seed: 0,
                gameObjects: [
                    {
                        id: 1,
                        falling: true,
                        occupies: [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(1, 1)],
                        colour: _graphics__WEBPACK_IMPORTED_MODULE_1__["Colour"].RED,
                        position: new Vec2(4, 5)
                    }
                ],
                waitTime: 0,
                paused: false,
                nextGameObjects: [],
                effects: [
                    new _tetris_io__WEBPACK_IMPORTED_MODULE_2__["Instantiate"]({
                        id: 1,
                        falling: true,
                        occupies: [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(1, 1)],
                        colour: _graphics__WEBPACK_IMPORTED_MODULE_1__["Colour"].RED,
                        position: new Vec2(4, 5)
                    })
                ]
            });
        }
        if (typeof window != 'undefined') {
            window.onload = main;
        }
        /***/ 
    }),
    /***/ "./src/tetris_io.ts": 
    /*!**************************!*\
      !*** ./src/tetris_io.ts ***!
      \**************************/
    /*! exports provided: output, Instantiate, MoveEffect */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "output", function () { return output; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instantiate", function () { return Instantiate; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveEffect", function () { return MoveEffect; });
        /* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tetris */ "./src/tetris.ts");
        /* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphics */ "./src/graphics.ts");
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
                var components = this.obj.occupies.map(function (v) { return new _graphics__WEBPACK_IMPORTED_MODULE_1__["SVGRectangle"](backing, v.add(_this.obj.position), _tetris__WEBPACK_IMPORTED_MODULE_0__["C"].TILE_WIDTH, _tetris__WEBPACK_IMPORTED_MODULE_0__["C"].TILE_HEIGHT, _this.obj.colour); });
                new _graphics__WEBPACK_IMPORTED_MODULE_1__["ObjectBag"](this.obj.id, this.obj.position, components);
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
                _graphics__WEBPACK_IMPORTED_MODULE_1__["ObjectBag"].getObjectBag(this.obj.id).fmap(function (o) { return o.setPosition(_this.pos); });
            };
            return MoveEffect;
        }());
        /***/ 
    })
    /******/ 
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3NyYy9DOi9Vc2Vycy9IZW5yaS9Eb2N1bWVudHMvSG9tZS9EZXZlbG9wbWVudC9UeXBlU2NyaXB0L1RldHJpcy9zcmMvYmFzZS9tYXliZS50cyIsIndlYnBhY2s6Ly8vc3JjL0M6L1VzZXJzL0hlbnJpL0RvY3VtZW50cy9Ib21lL0RldmVsb3BtZW50L1R5cGVTY3JpcHQvVGV0cmlzL3NyYy9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vc3JjL0M6L1VzZXJzL0hlbnJpL0RvY3VtZW50cy9Ib21lL0RldmVsb3BtZW50L1R5cGVTY3JpcHQvVGV0cmlzL3NyYy90ZXRyaXMudHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi9Vc2Vycy9IZW5yaS9Eb2N1bWVudHMvSG9tZS9EZXZlbG9wbWVudC9UeXBlU2NyaXB0L1RldHJpcy9zcmMvdGV0cmlzX2lvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwr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QUFDO0FBQ04sQ0FBQztBQUVEO0lBQ0kscUJBQW9DLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO0lBQUcsQ0FBQztJQUNoRCx3QkFBRSxHQUFULFVBQVUsT0FBb0I7UUFBOUIsaUJBV0M7UUFWRyxJQUFNLFVBQVUsR0FBcUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNsRCxXQUFDLElBQUksV0FBSSxzREFBWSxDQUNiLE9BQU8sRUFDUCxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQ3hCLHlDQUFDLENBQUMsVUFBVSxFQUNaLHlDQUFDLENBQUMsV0FBVyxFQUNiLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUNsQixFQU5BLENBTUEsQ0FDUixDQUFDO1FBQ04sSUFBSSxtREFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDTCxrQkFBQztBQUFELENBQUM7QUFFRDtJQUNJLG9CQUFtQyxHQUFlLEVBQWtCLEdBQVM7UUFBMUMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFrQixRQUFHLEdBQUgsR0FBRyxDQUFNO0lBQUcsQ0FBQztJQUNqRix1QkFBRSxHQUFGLFVBQUcsQ0FBYztRQUFqQixpQkFJQztRQUhHLG1EQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNwQyxXQUFDLElBQUksUUFBQyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLEVBQXZCLENBQXVCLENBQy9CLENBQUM7SUFDTixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDO0FBRXlDIiwiZmlsZSI6Im1haW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdGV0cmlzLnRzXCIpO1xuIiwiaW1wb3J0IHsgRnVuY3RvciwgQXBwbGljYXRpdmUsIE1vbmFkIH0gZnJvbSBcIi4vdHlwZWNsYXNzZXNcIjtcclxuXHJcbmNvbnN0IE5PVEhJTkdfU1RSSU5HOiBzdHJpbmcgPSBcIk5vdGhpbmdcIjtcclxuY29uc3QgSlVTVF9TVFJJTkc6IHN0cmluZyA9IFwiSnVzdCBcIlxyXG5cclxuY2xhc3MgTWF5YmU8VD4gaW1wbGVtZW50cyBGdW5jdG9yPFQ+LCBBcHBsaWNhdGl2ZTxUPiwgTW9uYWQ8VD4ge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlzSnVzdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgb2JqOiBUIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9iaj86IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5pc0p1c3QgPSBvYmogIT09IG51bGwgJiYgb2JqICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5vYmogPSB0aGlzLmlzSnVzdCA/IDxUPm9iaiA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZnJvbUp1c3QgPSAoKSA9PiA8VD50aGlzLm9iajsvLyB0aGlzLmlzSnVzdCA/IHRoaXMub2JqIDogdW5kZWZpbmVkOyAvLyA8VD50aGlzLm9iajsgfiB0aGlzIGlzIHRoZSBwYXJ0aWFsIGFsdGVybmF0aXZlLlxyXG4gICAgcHVibGljIGZyb21NYXliZSA9IChkZWZsdDogVCkgPT4gdGhpcy5pc0p1c3QgPyB0aGlzLm9iaiA6IGRlZmx0O1xyXG4gICAgcHVibGljIGZtYXAgPSA8Vj4gKGY6KChfOlQpID0+IFYpKSA9PlxyXG4gICAgICAgIHRoaXMuaXNKdXN0ID8gbmV3IE1heWJlPFY+KGYoPFQ+dGhpcy5vYmopKSA6IG5vdGhpbmc8Vj4oKTtcclxuICAgIHB1YmxpYyBhcHBseSA9IDxWPiAobWI6IE1heWJlPCgoXzpUKSA9PiBWKT4pID0+XHJcbiAgICAgICAgbWIuaXNKdXN0ID8gdGhpcy5mbWFwKDwoXzpUKSA9PiBWPm1iLmZyb21KdXN0KCkpIDogbm90aGluZzxWPigpO1xyXG4gICAgcHVibGljIGJpbmQgPSA8Vj4gKGY6KChfOlQpID0+IE1heWJlPFY+KSkgPT4gdGhpcy5pc0p1c3QgPyBmKDxUPnRoaXMuZnJvbUp1c3QoKSkgOiBub3RoaW5nPFY+KCk7XHJcbiAgICBcclxuICAgIHB1YmxpYyB0b1N0cmluZyA9ICgpID0+IHRoaXMuaXNKdXN0ID8gSlVTVF9TVFJJTkcuY29uY2F0KFN0cmluZyh0aGlzLm9iaikpIDogTk9USElOR19TVFJJTkc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGhpbmc8VD4oKTogTWF5YmU8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBNYXliZTxUPigpO1xyXG59XHJcblxyXG5leHBvcnQgeyBNYXliZSwgbm90aGluZyB9IiwiaW1wb3J0IHsgTWF5YmUsIG5vdGhpbmcgfSBmcm9tIFwiLi9iYXNlL21heWJlXCI7XHJcbmltcG9ydCB7IEMsIFZlYzIgfSBmcm9tIFwiLi90ZXRyaXNcIjtcclxuXHJcbmVudW0gQ29sb3VyIHtcclxuICAgIFdISVRFID0gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIixcclxuICAgIEJMQUNLID0gXCJyZ2IoMCwgMCwgMClcIixcclxuICAgIFJFRCA9IFwicmdiKDI0MCwgMjAsIDIwKVwiLFxyXG4gICAgR1JFRU4gPSBcInJnYigyMCwgMjQwLCAyMClcIixcclxuICAgIEJMVUUgPSBcInJnYigyMCwgMjAsIDI0MClcIixcclxuICAgIENZQU4gPSBcInJnYig2NSwgMjA1LCAyMzApXCIsXHJcbiAgICBNQUdFTlRBID0gXCJyZ2IoMjMwLCA2NSwgMjA1KVwiLFxyXG4gICAgWUVMTE9XID0gXCJyZ2IoMjMwLCAyMDUsIDY1KVwiXHJcbn1cclxuXHJcbmVudW0gU1ZHU2hhcGUge1xyXG4gICAgUkVDVCA9IFwicmVjdFwiLFxyXG4gICAgQ0lSQ0xFID0gXCJjaXJjbGVcIixcclxuICAgIEVMTElQU0UgPSBcImVsbGlwc2VcIixcclxuICAgIExJTkUgPSBcImxpbmVcIixcclxuICAgIFBPTFlHT04gPSBcInBvbHlnb25cIlxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NUUk9LRTogQ29sb3VyID0gQ29sb3VyLkJMQUNLO1xyXG5jb25zdCBERUZBVUxUX0ZJTEw6IENvbG91ciA9IENvbG91ci5XSElURTtcclxuY29uc3QgREVGQVVMVF9TVFJPS0VfV0lEVEg6IG51bWJlciA9IDE7XHJcblxyXG50eXBlIEF0dHJpYlZhbHVlUGFpciA9IFtzdHJpbmcsIG51bWJlciB8IHN0cmluZ107XHJcblxyXG5jb25zdCBjcmVhdGVTVkc6KCAgIChfOkhUTUxFbGVtZW50KSA9PiAoX186U1ZHU2hhcGUpID0+IChfX186QXR0cmliVmFsdWVQYWlyW10pID0+IEVsZW1lbnQgICkgPVxyXG4gICAgKHBhcmVudDogSFRNTEVsZW1lbnQpID0+IChzdmdTaGFwZTogU1ZHU2hhcGUpID0+IChhdHRyaWJWYWx1ZVBhaXJzOiBBdHRyaWJWYWx1ZVBhaXJbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN2Z09iajogRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhwYXJlbnQubmFtZXNwYWNlVVJJLCBzdmdTaGFwZSk7XHJcbiAgICAgICAgYXR0cmliVmFsdWVQYWlycy5mb3JFYWNoKFxyXG4gICAgICAgICAgICAoZWxlbWVudDogQXR0cmliVmFsdWVQYWlyKSA9PiBzdmdPYmouc2V0QXR0cmlidXRlKGVsZW1lbnRbMF0sIFN0cmluZyhlbGVtZW50WzFdKSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChzdmdPYmopO1xyXG4gICAgICAgIHJldHVybiBzdmdPYmo7XHJcbiAgICB9XHJcblxyXG5mdW5jdGlvbiBjb29yZHNUb1BpeGVsUG9zKGNvb3JkczogVmVjMik6IFZlYzIge1xyXG4gICAgcmV0dXJuIG5ldyBWZWMyKGNvb3Jkcy54ICogQy5USUxFX1dJRFRILCBjb29yZHMueSAqIEMuVElMRV9IRUlHSFQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSZWN0KHBhcmVudDogSFRNTEVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBmaWxsOiBDb2xvdXIgPSBERUZBVUxUX0ZJTEwsXHJcbiAgICB4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCBzdHJva2VXaWR0aDogbnVtYmVyID0gREVGQVVMVF9TVFJPS0VfV0lEVEgpOiBFbGVtZW50IHtcclxuICAgIHJldHVybiBjcmVhdGVTVkcocGFyZW50KShTVkdTaGFwZS5SRUNUKShcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFtcIndpZHRoXCIsIHdpZHRoXSxcclxuICAgICAgICAgICAgW1wiaGVpZ2h0XCIsIGhlaWdodF0sXHJcbiAgICAgICAgICAgIFtcImZpbGxcIiwgZmlsbF0sXHJcbiAgICAgICAgICAgIFtcInN0cm9rZS13aWR0aFwiLCBzdHJva2VXaWR0aF0sXHJcbiAgICAgICAgICAgIFtcInN0cm9rZVwiLCBERUZBVUxUX1NUUk9LRV0sXHJcbiAgICAgICAgICAgIFtcInhcIiwgeF0sXHJcbiAgICAgICAgICAgIFtcInlcIiwgeV1cclxuICAgICAgICAgICAgLyogLy8gQ2VudGVyaW5nOlxyXG4gICAgICAgICAgICBbXCJ4XCIsICh4IC0gd2lkdGggLSBzdHJva2VXaWR0aCkvMl0sXHJcbiAgICAgICAgICAgIFtcInlcIiwgKHkgLSBoZWlnaHQgLSBzdHJva2VXaWR0aCkvMl1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICBdXHJcbiAgICApO1xyXG59XHJcblxyXG5jbGFzcyBTVkdSZWN0YW5nbGUgaW1wbGVtZW50cyBTVkdPYmplY3Qge1xyXG4gICAgcHJpdmF0ZSBvYmo6IEVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGFsaXZlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyZW50OiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBwb3M6IFZlYzIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBmaWxsOiBDb2xvdXIpIHtcclxuICAgICAgICB0aGlzLm9iaiA9IGNyZWF0ZVJlY3QocGFyZW50LCB3aWR0aCwgaGVpZ2h0LCBmaWxsLCBwb3MueCwgcG9zLnkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFBvc2l0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbihwb3M6IFZlYzIpIHtcclxuICAgICAgICBpZiAodGhpcy5hbGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9iai5zZXRBdHRyaWJ1dGUoXCJ4XCIsIFN0cmluZyhjb29yZHNUb1BpeGVsUG9zKHBvcykueCkpO1xyXG4gICAgICAgICAgICB0aGlzLm9iai5zZXRBdHRyaWJ1dGUoXCJ5XCIsIFN0cmluZyhjb29yZHNUb1BpeGVsUG9zKHBvcykueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFsaXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMub2JqKTtcclxuICAgICAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0FsaXZlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsaXZlO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgU1ZHT2JqZWN0IHtcclxuICAgIGdldFBvc2l0aW9uKCk6IFZlYzI7XHJcbiAgICBzZXRQb3NpdGlvbihwb3M6IFZlYzIpOiB2b2lkO1xyXG4gICAgZGVzdHJveSgpOiB2b2lkO1xyXG4gICAgaXNBbGl2ZSgpOiBib29sZWFuO1xyXG59XHJcblxyXG5jbGFzcyBPYmplY3RCYWcge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgb2JqZWN0QmFnczogQXJyYXk8T2JqZWN0QmFnPiA9IFtdXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmplY3RCYWcoaWQ6IG51bWJlcik6IE1heWJlPE9iamVjdEJhZz4ge1xyXG4gICAgICAgIGNvbnN0IGJhZ3M6IEFycmF5PE9iamVjdEJhZz4gPSBPYmplY3RCYWcub2JqZWN0QmFncy5maWx0ZXIobyA9PiBvLmlkID09IGlkKTtcclxuICAgICAgICByZXR1cm4gKGJhZ3MubGVuZ3RoID4gMCkgPyBuZXcgTWF5YmUoYmFnc1swXSkgOiBub3RoaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdmdPYmplY3RzOiBBcnJheTxTVkdPYmplY3Q+O1xyXG5cclxuICAgIC8qIGlkIG11c3QgYmUgdW5pcXVlLCBvciB5b3Ugd2lsbCBiZSB1bmFibGUgdG8gcmV0cmlldmUgc3Vic2VxdWVudCBiYWdzLiAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgaWQ6IG51bWJlciwgcHJpdmF0ZSBwb3M6IFZlYzIsIF9zdmdFbGVtZW50czogQXJyYXk8U1ZHT2JqZWN0Pikge1xyXG4gICAgICAgIHRoaXMuc3ZnT2JqZWN0cyA9IFsuLi5fc3ZnRWxlbWVudHNdO1xyXG4gICAgICAgIE9iamVjdEJhZy5vYmplY3RCYWdzID0gWy4uLk9iamVjdEJhZy5vYmplY3RCYWdzLCB0aGlzXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3M7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0SUQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0UG9zaXRpb24odG86IFZlYzIpIHtcclxuICAgICAgICBjb25zdCBkaWY6IFZlYzIgPSBjb29yZHNUb1BpeGVsUG9zKHRvLnN1YnQodGhpcy5wb3MpKTtcclxuICAgICAgICB0aGlzLnN2Z09iamVjdHMgPSB0aGlzLnN2Z09iamVjdHMuZmlsdGVyKG8gPT4gby5pc0FsaXZlKCkpO1xyXG4gICAgICAgIHRoaXMuc3ZnT2JqZWN0cy5mb3JFYWNoKG8gPT4gby5nZXRQb3NpdGlvbigpLmFkZChkaWYpKTtcclxuICAgICAgICB0aGlzLnBvcyA9IHRvO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExpdmVPYmplY3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN2Z09iamVjdHMuZmlsdGVyKG8gPT4gby5pc0FsaXZlKCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTVkdTaGFwZSwgQXR0cmliVmFsdWVQYWlyLCBDb2xvdXIsIFNWR09iamVjdCwgU1ZHUmVjdGFuZ2xlLCBPYmplY3RCYWcgfSIsImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbi8vIGltcG9ydCB7IGludGVydmFsLCBmcm9tRXZlbnQsIE9ic2VydmFibGUsIEVNUFRZIH0gZnJvbSBcInJ4anNcIjtcclxuLy8gaW1wb3J0IHsgbWFwLCBzY2FuLCBmaWx0ZXIsIG1lcmdlIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCB7IE1heWJlLCBub3RoaW5nIH0gZnJvbSBcIi4vYmFzZS9tYXliZVwiO1xyXG5pbXBvcnQgeyBDb2xvdXIgfSBmcm9tIFwiLi9ncmFwaGljc1wiO1xyXG5pbXBvcnQgeyBJbnN0YW50aWF0ZSwgTW92ZUVmZmVjdCwgb3V0cHV0IH0gZnJvbSBcIi4vdGV0cmlzX2lvXCI7XHJcblxyXG5jb25zdCBDID0gbmV3IGNsYXNzIHtcclxuICAgIC8vLy0tLSBCYWNraW5nIC0tLS8vL1xyXG4gICAgcmVhZG9ubHkgQkFDS0RST1BfSUQ6IHN0cmluZyA9IFwiYmFja2Ryb3BcIjtcclxuICAgIHJlYWRvbmx5IFBJWEVMX1dJRFRIOiBudW1iZXIgPSA3MjA7XHJcbiAgICByZWFkb25seSBQSVhFTF9IRUlHSFQ6IG51bWJlciA9IDEyODA7XHJcbiAgICByZWFkb25seSBUSUxFU19IT1JJWk9OVEFMOiBudW1iZXIgPSAxMDtcclxuICAgIHJlYWRvbmx5IFRJTEVTX1ZFUlRJQ0FMOiBudW1iZXIgPSA0MDtcclxuICAgIHJlYWRvbmx5IFRJTEVfV0lEVEg6IG51bWJlciA9IHRoaXMuUElYRUxfV0lEVEggLyB0aGlzLlRJTEVTX0hPUklaT05UQUw7XHJcbiAgICByZWFkb25seSBUSUxFX0hFSUdIVDogbnVtYmVyID0gdGhpcy5QSVhFTF9IRUlHSFQgLyB0aGlzLlRJTEVTX1ZFUlRJQ0FMO1xyXG4gICAgLy8vIC0tLSAgICAgICAgLS0tIC8vL1xyXG5cclxuICAgIHJlYWRvbmx5IEJBU0VfU1RBVEU6IEdhbWVTdGF0ZSA9IHtcclxuICAgICAgICBzZWVkOiAwLFxyXG4gICAgICAgIGdhbWVPYmplY3RzOiBbXSxcclxuICAgICAgICB3YWl0VGltZTogMCxcclxuICAgICAgICBwYXVzZWQ6IGZhbHNlLFxyXG4gICAgICAgIG5leHRHYW1lT2JqZWN0czogW10sXHJcbiAgICAgICAgZWZmZWN0czogW11cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZCh4OiBudW1iZXIsIHM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAvLyBXZXlsIFNlcXVlbmNlICg/KS5cclxuICAgIGNvbnN0IHY6IG51bWJlciA9IE1hdGguZXhwKE1hdGgubG9nKE1hdGguYWJzKHggKyBzKSkgKyAxKTtcclxuICAgIHJldHVybiAodiAtIE1hdGguZmxvb3IodikpO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRWZmZWN0IHtcclxuICAgIGRvKGJhY2tpbmc6IEhUTUxFbGVtZW50KTogdm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgQWN0aW9uIHtcclxuICAgIG5leHRTdGF0ZShzdGF0ZTogR2FtZVN0YXRlKTogR2FtZVN0YXRlO1xyXG59XHJcblxyXG5jbGFzcyBNb3ZlT2JqZWN0IGltcGxlbWVudHMgQWN0aW9uIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb2JqOiBHYW1lT2JqZWN0LCBwdWJsaWMgcmVhZG9ubHkgcG9zOiBWZWMyKSB7fVxyXG4gICAgbmV4dFN0YXRlKHN0YXRlOiBHYW1lU3RhdGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgZWZmZWN0czogW1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUuZWZmZWN0cywgICAgICAgLy8gVHlwaWNhbGx5LCBlZmZlY3RzIHdpbGwgYmUgZW1wdHkgKHJlZ3VsYXIgdXNlIGNhc2Ugd2hlcmUgTW92ZU9iamVjdCBpcyBhIHVuaXQgYWN0aW9uLCBub3QgY29tcG9zZWQgd2l0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW55IG90aGVyIEFjdGlvbikuIElmIHlvdSB3b3VsZCBwcmVmZXIgdG8gY29tcG9zZSBBY3Rpb25zIG9uIEFjdGlvbnMsIHRoaXMgYmVjb21lcyB1c2VmdWwuXHJcbiAgICAgICAgICAgICAgICBuZXcgTW92ZUVmZmVjdCh0aGlzLm9iaiwgdGhpcy5wb3MpXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGdhbWVPYmplY3RzOiBbXHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZS5nYW1lT2JqZWN0cy5maWx0ZXIobyA9PiBvICE9PSB0aGlzLm9iaiksIHtcclxuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLm9iaixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFZlYzIge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB4OiBudW1iZXIsIHB1YmxpYyByZWFkb25seSB5OiBudW1iZXIpIHt9XHJcbiAgICBwdWJsaWMgYWRkID0gKG90aGVyOiBWZWMyKSA9PiBuZXcgVmVjMih0aGlzLnggKyBvdGhlci54LCB0aGlzLnkgKyBvdGhlci55KTtcclxuICAgIHB1YmxpYyBzdWJ0ID0gKG90aGVyOiBWZWMyKSA9PiBuZXcgVmVjMih0aGlzLnggLSBvdGhlci54LCB0aGlzLnkgLSBvdGhlci55KVxyXG4gICAgcHVibGljIG11bHQgPSAodmFsOiBudW1iZXIpID0+IG5ldyBWZWMyKHRoaXMueCAqIHZhbCwgdGhpcy55ICogdmFsKTtcclxuICAgIHB1YmxpYyBhbHRYID0gKHg6IG51bWJlcikgPT4gbmV3IFZlYzIoeCwgdGhpcy55KTtcclxuICAgIHB1YmxpYyBhbHRZID0gKHk6IG51bWJlcikgPT4gbmV3IFZlYzIodGhpcy54LCB5KTtcclxufVxyXG5cclxudHlwZSBHYW1lT2JqZWN0ID0gUmVhZG9ubHk8e1xyXG4gICAgaWQ6IG51bWJlcixcclxuICAgIGZhbGxpbmc6IGJvb2xlYW4sXHJcbiAgICBvY2N1cGllczogQXJyYXk8VmVjMj4sXHJcbiAgICBjb2xvdXI6IENvbG91cixcclxuICAgIHBvc2l0aW9uOiBWZWMyXHJcbn0+O1xyXG5cclxudHlwZSBHYW1lU3RhdGUgPSBSZWFkb25seTx7XHJcbiAgICBzZWVkOiBudW1iZXIsXHJcbiAgICBnYW1lT2JqZWN0czogQXJyYXk8R2FtZU9iamVjdD4sXHJcbiAgICB3YWl0VGltZTogbnVtYmVyLFxyXG4gICAgcGF1c2VkOiBib29sZWFuLFxyXG4gICAgbmV4dEdhbWVPYmplY3RzOiBBcnJheTxHYW1lT2JqZWN0PixcclxuICAgIGVmZmVjdHM6IEFycmF5PEVmZmVjdD5cclxufT47XHJcblxyXG5jb25zdCByZWR1Y2VTdGF0ZTogKChfOiBHYW1lU3RhdGUsIF9fOiBBY3Rpb24pID0+IEdhbWVTdGF0ZSkgPSAoc3RhdGU6IEdhbWVTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pID0+IGFjdGlvbi5uZXh0U3RhdGUoXHJcbiAgICB7IC4uLnN0YXRlLFxyXG4gICAgICAgICBlZmZlY3RzOiBbXVxyXG4gICAgfVxyXG4pO1xyXG5cclxuZnVuY3Rpb24gbWFpbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IGJhY2tpbmc6IE1heWJlPEhUTUxFbGVtZW50PiA9IG5ldyBNYXliZTxIVE1MRWxlbWVudD4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQy5CQUNLRFJPUF9JRCkpO1xyXG4gICAgLy8gYmFja2luZy5mbWFwKGJja2luZyA9PiB7XHJcbiAgICAvLyAgICAgY29uc3QgYWN0aW9ucyQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IEVNUFRZO1xyXG4gICAgLy8gICAgIGNvbnN0IGdhbWUkOiBPYnNlcnZhYmxlPEdhbWVTdGF0ZT4gPSBhY3Rpb25zJC5waXBlKFxyXG4gICAgLy8gICAgICAgICBzY2FuPEFjdGlvbiwgR2FtZVN0YXRlPihyZWR1Y2VTdGF0ZSwgQy5CQVNFX1NUQVRFKSAgLy8gVE9ETzogV2UgZG9uJ3Qgd2FudCB0byB1c2UgdGhlIGJhc2Ugc3RhdGUsIHdlIG5lZWQgdG8gdHdlYWsgaXQgc29tZXdoYXQuXHJcbiAgICAvLyAgICAgKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICBnYW1lJC5zdWJzY3JpYmUob3V0cHV0KGJja2luZykpO1xyXG4gICAgLy8gfSlcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInlhIHllZXRcIik7XHJcblxyXG4gICAgb3V0cHV0KGJhY2tpbmcuZnJvbUp1c3QoKSkoe1xyXG4gICAgICAgIHNlZWQ6IDAsXHJcbiAgICAgICAgZ2FtZU9iamVjdHM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgICAgICBmYWxsaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb2NjdXBpZXM6IFtuZXcgVmVjMigwLDApLCBuZXcgVmVjMigwLDEpLCBuZXcgVmVjMigwLDIpLCBuZXcgVmVjMigxLDEpXSxcclxuICAgICAgICAgICAgICAgIGNvbG91cjogQ29sb3VyLlJFRCxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjMig0LDUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHdhaXRUaW1lOiAwLFxyXG4gICAgICAgIHBhdXNlZDogZmFsc2UsXHJcbiAgICAgICAgbmV4dEdhbWVPYmplY3RzOiBbXSxcclxuICAgICAgICBlZmZlY3RzOiBbXHJcbiAgICAgICAgICAgIG5ldyBJbnN0YW50aWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgICAgIGZhbGxpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvY2N1cGllczogW25ldyBWZWMyKDAsMCksIG5ldyBWZWMyKDAsMSksIG5ldyBWZWMyKDAsMiksIG5ldyBWZWMyKDEsMSldLFxyXG4gICAgICAgICAgICAgICAgY29sb3VyOiBDb2xvdXIuUkVELFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBWZWMyKDQsNSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG5pZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgd2luZG93Lm9ubG9hZCA9IG1haW47XHJcbn1cclxuXHJcbmV4cG9ydCB7IEdhbWVTdGF0ZSwgR2FtZU9iamVjdCwgVmVjMiwgRWZmZWN0LCBDIH0iLCJpbXBvcnQgeyBHYW1lU3RhdGUsIEVmZmVjdCwgR2FtZU9iamVjdCwgVmVjMiwgQyB9IGZyb20gXCIuL3RldHJpc1wiXHJcbmltcG9ydCB7IENvbG91ciwgT2JqZWN0QmFnLCBTVkdPYmplY3QsIFNWR1JlY3RhbmdsZSB9IGZyb20gXCIuL2dyYXBoaWNzXCI7XHJcblxyXG5mdW5jdGlvbiBvdXRwdXQoYmFja2luZzogSFRNTEVsZW1lbnQpOiAoKF86IEdhbWVTdGF0ZSkgPT4gdm9pZCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAoc3RhdGU6IEdhbWVTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS5lZmZlY3RzLmZvckVhY2goZSA9PiBlLmRvKGJhY2tpbmcpKVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn1cclxuXHJcbmNsYXNzIEluc3RhbnRpYXRlIGltcGxlbWVudHMgRWZmZWN0IHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG9iajogR2FtZU9iamVjdCkge31cclxuICAgIHB1YmxpYyBkbyhiYWNraW5nOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHM6IEFycmF5PFNWR09iamVjdD4gPSB0aGlzLm9iai5vY2N1cGllcy5tYXAoXHJcbiAgICAgICAgICAgICAgICB2ID0+IG5ldyBTVkdSZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYuYWRkKHRoaXMub2JqLnBvc2l0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQy5USUxFX1dJRFRILFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDLlRJTEVfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9iai5jb2xvdXJcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7IFxyXG4gICAgICAgIG5ldyBPYmplY3RCYWcodGhpcy5vYmouaWQsIHRoaXMub2JqLnBvc2l0aW9uLCBjb21wb25lbnRzKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW92ZUVmZmVjdCBpbXBsZW1lbnRzIEVmZmVjdCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9iajogR2FtZU9iamVjdCwgcHVibGljIHJlYWRvbmx5IHBvczogVmVjMikge31cclxuICAgIGRvKF86IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgT2JqZWN0QmFnLmdldE9iamVjdEJhZyh0aGlzLm9iai5pZCkuZm1hcChcclxuICAgICAgICAgICAgbyA9PiBvLnNldFBvc2l0aW9uKHRoaXMucG9zKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IG91dHB1dCwgSW5zdGFudGlhdGUsIE1vdmVFZmZlY3QgfSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceMappingURL=main-bundle.js.map