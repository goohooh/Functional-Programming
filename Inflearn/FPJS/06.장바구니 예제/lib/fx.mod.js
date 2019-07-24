((win) => {
 const curry = f =>
    (a, ..._) => _.length
        ? f(a, ..._)
        : (..._) => f(a, ..._);

const map = (f, iter) => {
    const res = [];
    for (const i of iter) res.push(f(i));
    return res;
};

const filter = (f, iter) => {
    let res = [];
    for (const i of iter) {
        if (f(i)) res.push(i);
    }
    return res;
};

const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const i of iter) acc = f(acc, i);
    return acc;
};

const go = (...args) => reduce((acc, f) => f(acc), args)

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

win._ = {
    curry,
    map: curry(map),
    filter: curry(filter),
    reduce: curry(reduce),
    go,
    pipe,
};
})(window);