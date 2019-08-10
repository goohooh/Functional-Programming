const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const obj1 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

L.values = function *(obj) {
    for (const k in obj) yield obj[k];
};

_.go(
    obj1,
    L.values,
    L.take(2), // iteration 최소화
    _.reduce((a,b) => a + b),
    console.log
)