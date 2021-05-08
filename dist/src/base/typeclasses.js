// Note that this typing is stricter-than-necessary. The real constraint is this:
// Let (o, f1, f2, ..., fn) be an input to pipeMap. Then fn . f(n-1) . ... . f2 . f1
// needs to be a well-defined function composition, with type V -> T, where o is a
// Functor of V and the output is a Functor of T.
function pipeMap(o) {
    var fs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        fs[_i - 1] = arguments[_i];
    }
    return fs.reduce(function (a, b) { return a.fmap(b); }, o);
}
// Much as above for pipeMap, we have a stricter-than-necessary type constraint here.
function kleisliCompose(m) {
    var fs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        fs[_i - 1] = arguments[_i];
    }
    return fs.reduce(function (a, b) { return a.bind(b); }, m);
}
export { pipeMap, kleisliCompose };
//# sourceMappingURL=typeclasses.js.map