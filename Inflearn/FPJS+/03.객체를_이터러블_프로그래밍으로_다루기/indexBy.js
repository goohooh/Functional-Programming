const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const users = [
    { id: 5, name: 'AA', age: 35 },
    { id: 10, name: 'BB', age: 26 },
    { id: 19, name: 'CC', age: 28 },
    { id: 23, name: 'CC', age: 34 },
    { id: 24, name: 'EE', age: 23 },
];

const indexBy = (f, iter) => _.reduce((obj, a) => (obj[f(a)] = a, obj), {}, iter);
console.log(indexBy(u => u.id, users));

console.clear();
/* indexBy된 값을 filter 하기 */
const users2 = _.indexBy(u => u.id, users);
_.go(
    users2,
    L.entries,
    L.filter(([_, { age }]) => age < 30),
    L.take(2),
    _.object,
    console.log,
)