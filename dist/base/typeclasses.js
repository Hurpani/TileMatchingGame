define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.kleisliCompose = exports.pipeMap = void 0;
    // Note that this typing is stricter-than-necessary. The real constraint is this:
    // Let (o, f1, f2, ..., fn) be an input to pipeMap. Then fn . f(n-1) . ... . f2 . f1
    // needs to be a well-defined function composition, with type V -> T, where o is a
    // Functor of V and the output is a Functor of T.
    function pipeMap(o, ...fs) {
        return fs.reduce((a, b) => a.fmap(b), o);
    }
    exports.pipeMap = pipeMap;
    // Much as above for pipeMap, we have a stricter-than-necessary type constraint here.
    function kleisliCompose(m, ...fs) {
        return fs.reduce((a, b) => a.bind(b), m);
    }
    exports.kleisliCompose = kleisliCompose;
});
//# sourceMappingURL=typeclasses.js.map