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
export { Maybe, nothing };
//# sourceMappingURL=maybe.js.map