interface Functor<T> {
    fmap<V>(_:((__:T) => V)): Functor<V>;
}

interface Applicative<T> extends Functor<T> {
    apply<V>(_:Functor<((__:T) => V)>): Applicative<V>;
}

interface Monad<T> extends Functor<T>, Applicative<T> {
    bind<V>(_:((__:T) => Monad<V>)): Monad<V>;
}

// Note that this typing is stricter-than-necessary. The real constraint is this:
// Let (o, f1, f2, ..., fn) be an input to pipeMap. Then fn . f(n-1) . ... . f2 . f1
// needs to be a well-defined function composition, with type V -> T, where o is a
// Functor of V and the output is a Functor of T.
function pipeMap<T>(o:Functor<T>, ... fs:[((_:T) => T)]): Functor<T> {
    return fs.reduce((a, b) => a.fmap(b), o);
}

// Much as above for pipeMap, we have a stricter-than-necessary type constraint here.
function kleisliCompose<T>(m:Monad<T>, ... fs:[((_:T) => Monad<T>)]): Monad<T> {
    return fs.reduce((a, b) => a.bind(b), m)
}

export { Functor, Applicative, Monad, pipeMap, kleisliCompose }