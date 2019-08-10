const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const obj1 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

L.entries = function *(obj) {
    for (const k in obj) yield [k, obj[k]];
};

_.go(
    obj1,
    L.entries,
    L.filter(([_, v]) => v % 2),
    L.map(([k, v]) => ({ [k]: v })),
    _.reduce(Object.assign),
    console.log
);