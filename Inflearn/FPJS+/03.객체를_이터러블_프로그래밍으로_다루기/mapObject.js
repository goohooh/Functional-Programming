const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const b = { a: 1, b: 2, c: 3 };

// 1: 객체를 entries로 만들자
// 2: mapping
// 3: 단일 객체로
// 4: merge
const mapObject = (f, obj) => _.go(
    obj,
    L.entries,
    _.map(([k, v]) => [k, f(v)]),
    _.object
);

console.log(mapObject(a => a + 10, b)); // { a: 11, b: 12, c: 13 }