const negate = <T> (f: ((_: T) => boolean)) => (t: T) => !f(t);
const anyOf = <T> (l: ReadonlyArray<T>) => (x: ((_: T) => boolean)) => l.reduce((a, y) => x(y) || a, false);
const allOf = <T> (l: ReadonlyArray<T>) => (x: ((_: T) => boolean)) => l.reduce((a, y) => x(y) && a, true);
const difference = <T> (l1: ReadonlyArray<T>) => (l2: ReadonlyArray<T>) => l1.filter(negate(x => l2.includes(x)));
const range = (low: number) => (high: number) => Array.from(Array(high - low + 1).keys()).map(x => x + low);
const swapAt = <T> (array: ReadonlyArray<T>) => (index: number) => (val: T) => { const outArray = array.slice(0); outArray[index] = val; return outArray; }

export { negate, anyOf, allOf, difference, range, swapAt }