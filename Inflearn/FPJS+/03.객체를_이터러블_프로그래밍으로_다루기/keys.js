const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const obj1 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

L.keys = function *(obj) {
    for (const k in obj) yield k;
};

_.go(
    obj1,
    L.keys,
    _.takeAll,
    console.log
    // _.each(console.log)
);