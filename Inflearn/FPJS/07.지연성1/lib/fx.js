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

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const i of iter) acc = f(acc, i);
    return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const add = (a, b) => a + b;

const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === l ) return res;
    }
    return res;
});

const range = len => {
    let i = 0;
    let res = [];
    while (i < len) res.push(i++);
    return res;
};

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
}