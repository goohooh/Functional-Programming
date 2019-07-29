const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const log = console.log;


const isIterable = a => a && a[Symbol.iterator];

const Lflatten = function *(iter) {
    for (const a of iter) {
        if (isIterable(a)) for (const b of a) yield b;
        else yield a
    }
};

const takeAll = _.take(Infinity);
const flatten = _.pipe(Lflatten, takeAll);

_.go(
    [[1,2], 3, 4, [5, 6], [7,8,9]],
    flatten,
    log,
)
_.go(
    [[1, [0,1,2,[11,12,13]],2], 3, 4, [5, 6], [7,8,9]],
    flatten,
    log,
)
_.go(
    [[1, [0,1,2,[11,12,13]],2], 3, 4, [5, 6], [7,8,9]],
    L.deepFlat,
    takeAll,
    log,
)