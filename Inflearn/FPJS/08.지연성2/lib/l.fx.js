const { curry, take, pipe, join, go } = require("./fx");

const range = function *(l) {
    let i = 0;
    while (i < l) {
        yield i++;
    };
};
const map = curry(function *(f, iter) {
    for (const a of iter) yield f(a);
});

const filter = curry(function *(f, iter) {
    for (const a of iter) if (f(a)) yield a;
});

const find = curry((f, iter) => go(
    iter,
    filter(f),
    take(1),
    ([a]) => a,
));

const entries = function *(obj) {
    for(const k in obj) yield [k, obj[k]];
}

const queryStr = pipe(
    entries,
    map(([k,v]) => `${k}=${v}`),
    join('&'),
);

const isIterable = a => a && a[Symbol.iterator];

const flatten = function *(iter) {
    for (const a of iter) {
        // if (isIterable(a)) for (const b of a) yield b; 아래와 동일
        if (isIterable(a)) yield *a;
        else yield a
    }
};

const deepFlat = function *f(iter) {
    for (const a of iter) {
        if (isIterable(a)) yield *f(a);
        else yield a
    }
};

const flatMap = curry(pipe(map, flatten));

module.exports = {
    range,
    map,
    filter,
    find,
    flatten,
    deepFlat,
    flatMap,
    entries,
    queryStr,
}