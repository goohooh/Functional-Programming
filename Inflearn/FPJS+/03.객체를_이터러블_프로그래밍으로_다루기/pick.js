const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const a = { a: 1, b: 2, c: 3, d: 4, e: 5 };

// const pick = (keys, obj) => _.go(
//     obj,
//     L.entries,
//     _.filter(([k, _]) => keys.some(_k => _k === k)),
//     _.object,
// ); - 내 구현

const pick = (keys, obj) => _.go(
    keys,
    L.map(k => [k, obj[k]]),
    L.reject(([_, v]) => v === undefined),
    _.object,
);

console.log(pick(['b', 'c', 'z'], a)); // { b: 2, c: 3 }
