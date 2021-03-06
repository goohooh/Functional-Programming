// const { flatten: Lflatten } = require('./l.fx');

 const curry = f =>
    (a, ..._) => _.length
        ? f(a, ..._)
        : (..._) => f(a, ..._);

const map = curry((f, iter) => {
    const res = [];
    for (const i of iter) res.push(f(i));
    return res;
});

const filter = curry((f, iter) => {
    let res = [];
    for (const i of iter) {
        if (f(i)) res.push(i);
    }
    return res;
});

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    // for (const i of iter) acc = f(acc, i); - 1

    // for (const i of iter) {
    //     acc = acc instanceof Promise ? acc.then(acc => f(acc, i)) : f(acc, i);
    // } - 2 : 성능 이슈

    // return acc;

    // 하나의 콜스택에서 동작
    // return (function recur(acc) {
    //     for (const a of iter) {
    //         acc = f(acc, a);
    //         if (acc instanceof Promise) return acc.then(recur);
    //     } 
    //     return acc;
    // })(acc); - 3 : 초기 값이 Promise일 경우 처리 못함

    return go1(acc, function recur(acc) {
        for (const a of iter) {
            acc = f(acc, a);
            if (acc instanceof Promise) return acc.then(recur);
        } 
        return acc;
    });
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const add = (a, b) => a + b;

const take = curry((l, iter) => {
    let res = [];
    return function recur() {
        for (const a of iter) {
            if (a instanceof Promise) return a.then(a => {
                res.push(a);
                if (res.length === l ) return res;
            });
            res.push(a);
            if (res.length === l ) return res;
        }
        return res;
    } ();
});

const takeAll = take(Infinity);

const range = len => {
    let i = 0;
    let res = [];
    while (i < len) res.push(i++);
    return res;
};

const join = curry((sep, iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter));

find = curry((f, iter) => go(
    iter,
    filter(f),
    take(1),
    ([a]) => a,
));

const L = {};

L.range = function *(l) {
    let i = 0;
    while (i < l) {
        yield i++;
    };
};
L.map = curry(function *(f, iter) {
    for (const a of iter) yield go1(a, f);
});

L.filter = curry(function *(f, iter) {
    for (const a of iter) if (f(a)) yield a;
});

L.entries = function *(obj) {
    for(const k in obj) yield [k, obj[k]];
}

const queryStr = pipe(
    L.entries,
    L.map(([k,v]) => `${k}=${v}`),
    join('&'),
);

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter) {
    for (const a of iter) {
        // if (isIterable(a)) for (const b of a) yield b; 아래와 동일
        if (isIterable(a)) yield *a;
        else yield a
    }
};

L.flatMap = curry(pipe(L.map, L.flatten));

const flatten = pipe(L.flatten, takeAll);

const flatMap = curry(pipe(L.map, flatten));

module.exports = {
    curry,
    map,
    filter,
    reduce,
    take,
    go,
    pipe,
    add,
    range,
    join,
    find,
    takeAll,
    flatten,
    flatMap,
    L,
};