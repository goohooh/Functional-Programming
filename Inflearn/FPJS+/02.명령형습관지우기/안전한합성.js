const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

/**
 * map으로 합성하기
 */
const f = x => x + 10;
const g = x => x - 10;
const fg = x => f(g(x));

console.log(fg(10));
console.log(fg()); // NaN

console.clear();
_.go(
    [10], // 모나드
    L.map(fg),
    _.each(console.log)
)
_.go(
    [], // 모나드
    L.map(fg),
    _.each(console.log)
)


console.clear();
/**
 * find 대신 L.filter
 */
const users = [
    { name: 'AA', age: 35 },
    // { name: 'BB', age: 26 },
    { name: 'CC', age: 28 },
    { name: 'CC', age: 34 },
    { name: 'EE', age: 23 },
];

const user = _.find(u => u.name === 'BB', users);
if (user) {
    console.log(user);
}

_.go(
    users,
    L.filter(u => u.name === 'BB'),
    L.take(1),
    _.each(console.log),
);

_.go(
    users,
    L.filter(u => u.name === 'BB'),
    L.take(1),
    L.map(u => u.age),
    _.each(console.log),
);
