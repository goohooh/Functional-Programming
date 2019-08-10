const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const a = [['a', 1], ['b', 2], ['c', 3]]
const b = {a:1, b:2, c:3};

const object = entries => _.go(
    entries,
    L.map(([k,v]) => ({ [k]: v })),
    _.reduce(Object.assign)
);

const object2 = entries => _.reduce((obj, [k,v]) => (obj[k] = v, obj), {}, entries);

let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);
console.log(object2(m)); // 된다!

// because...
console.log([...m[Symbol.iterator]()])

console.log([...m.keys()])
console.log([...m.values()])
console.log([...m.entries()])