 const curry = f =>
    (a, ..._) => _.length
        ? f(a, ..._)
        : (..._) => f(a, ..._);

const nop = Symbol('nop');
const noop = () => {};
const catchNoop = ([...arr]) =>
    (arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

// const map = curry((f, iter) => {
//     const res = [];
//     for (const i of iter) res.push(f(i));
//     return res;
// });

// const filter = curry((f, iter) => {
//     let res = [];
//     for (const i of iter) {
//         if (f(i)) res.push(i);
//     }
//     return res;
// });

const take = curry((l, iter) => {
    let res = [];
    // for (const a of iter) {
    //     res.push(a);
    //     if (res.length === l ) return res;
    // }
    // return res; - 1

    iter = iter[Symbol.iterator]();
    return (function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            if (a instanceof Promise) {
                return a
                    .then(a =>
                        (res.push(a), res).length === l ? res : recur()
                    ).catch(e =>
                        e === nop ? recur() : Promise.reject(e));
            }
            res.push(a);
            if (res.length === l ) return res;
        }
        return res;
    })();
});
const takeAll = take(Infinity);

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduceF = (acc, a, f) =>
    a instanceof Promise
        ? a.then(a => f(acc, a), e => e === nop ? acc : Promise.reject(e))
        : f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
    if (!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter);
    iter = iter[Symbol.iterator]();

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
        let cur;
        while (!(cur = iter.next()).done) {
            acc = reduceF(acc, cur.value, f);
            if (acc instanceof Promise) return acc.then(recur);
        } 
        return acc;
    });
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const add = (a, b) => a + b;

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
L.map = curry(function* (f, iter) {
    for (const a of iter) {
        yield go1(a, f);
    }
});

L.filter = curry(function *(f, iter) {
    for (const a of iter) {
        const b = go1(a, f);
        if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop));
        else if (b) yield a;
    }
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

const map = curry(pipe(L.map, takeAll))
const filter = curry(pipe(L.filter, takeAll))

const C = {};

C.reduce = curry((f, acc, iter) => iter
    // return iter
    //     ? reduce(f, acc, [...iter])
    //     : reduce(f, [...acc]); - 1 : [...]에서 에러 핸들링 필요함
        ? reduce(f, acc, catchNoop(iter))
        : reduce(f, catchNoop(acc))
);

C.take = curry((l, iter) => take(l, catchNoop(iter)))
C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));

module.exports = {
    add,
    noop,
    catchNoop,
    curry,
    map,
    filter,
    reduce,
    take,
    go,
    pipe,
    range,
    join,
    find,
    takeAll,
    flatten,
    flatMap,
    L,
    C,
};