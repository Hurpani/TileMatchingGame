import { Functor, Applicative, Monad } from "./typeclasses";

const NOTHING_STRING: string = "Nothing";
const JUST_STRING: string = "Just "

class Maybe<T> implements Functor<T>, Applicative<T>, Monad<T> {
    public readonly isJust: boolean;
    private readonly obj: T | undefined;

    constructor(obj?: T | null) {
        this.isJust = obj !== null && obj !== undefined;
        this.obj = this.isJust ? <T>obj : undefined;
    }

    public fromJust = () => <T>this.obj;// this.isJust ? this.obj : undefined; // <T>this.obj; ~ this is the partial alternative.
    public fromMaybe = (deflt: T) => this.isJust ? this.obj : deflt;
    public fmap = <V> (f:((_:T) => V)) =>
        this.isJust ? new Maybe<V>(f(<T>this.obj)) : nothing<V>();
    public apply = <V> (mb: Maybe<((_:T) => V)>) =>
        mb.isJust ? this.fmap(<(_:T) => V>mb.fromJust()) : nothing<V>();
    public bind = <V> (f:((_:T) => Maybe<V>)) => this.isJust ? f(<T>this.fromJust()) : nothing<V>();
    
    public toString = () => this.isJust ? JUST_STRING.concat(String(this.obj)) : NOTHING_STRING;
}

function nothing<T>(): Maybe<T> {
    return new Maybe<T>();
}

function just<T>(val: T): Maybe<T> {
    return new Maybe<T>(val);
}

export { Maybe, nothing, just }