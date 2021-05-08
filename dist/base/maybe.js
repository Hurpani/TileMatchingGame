define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nothing = exports.Maybe = void 0;
    const NOTHING_STRING = "Nothing";
    const JUST_STRING = "Just ";
    class Maybe {
        constructor(obj) {
            this.fromJust = () => this.obj; // this.isJust ? this.obj : undefined; // <T>this.obj; ~ this is the partial alternative.
            this.fromMaybe = (deflt) => this.isJust ? this.obj : deflt;
            this.fmap = (f) => this.isJust ? new Maybe(f(this.obj)) : nothing();
            this.apply = (mb) => mb.isJust ? this.fmap(mb.fromJust()) : nothing();
            this.bind = (f) => this.isJust ? f(this.fromJust()) : nothing();
            this.toString = () => this.isJust ? JUST_STRING.concat(String(this.obj)) : NOTHING_STRING;
            this.isJust = obj !== null && obj !== undefined;
            this.obj = this.isJust ? obj : undefined;
        }
    }
    exports.Maybe = Maybe;
    function nothing() {
        return new Maybe();
    }
    exports.nothing = nothing;
});
//# sourceMappingURL=maybe.js.map