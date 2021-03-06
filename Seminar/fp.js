const curry = f => (a, ...args) =>
    args.length ? f(a, ...args) : (...as) => f(a, ...as);

const delay = (time, a) => new Promise(resolve =>
    setTimeout(() => resolve(a), time));

const Lazy = {};

Lazy.range = function *(stop) {
    let i = -1;
    while(++i < stop) yield i;
};

Lazy.filter = curry(function *(f, iter) {
    for (const a of iter) {
        if (f(a)) yield a;
    }
});

Lazy.flat = function *(iter) {
    for (const a of iter) {
        if (a && a[Symbol.iterator]) yield* a;
        else yield a;
    }
};

Lazy.map = curry(function *(f, iter) {
    for (const a of iter) {
        yield f(a);
    }
});

const reduce = curry(function (f, acc, iter) {
    if (arguments.length === 2) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
});

const add = (a, b) => a + b;

const go = (...as) => reduce(goPromise, as);
const goPromise = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const take = curry(function (length, iter) {
    const res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === length) return res;
    }
    return res;
});

const takeWhile = curry(function (f, iter) {
    iter = iter[Symbol.iterator]();
    iter.return = null;
    const res = [];
    return function recur() {
        for (const a of iter) {
            const b = goPromise(a, f);
            if (!b) return res;
            if (b instanceof Promise) return b.then(
                async b => b ? (res.push(await a), recur()) : res
            );
            res.push(a);
        }
        return res;
    }();
});

module.exports = {
    add,
    delay,
    go,
    reduce,
    take,
    takeWhile,
    L: Lazy,
};