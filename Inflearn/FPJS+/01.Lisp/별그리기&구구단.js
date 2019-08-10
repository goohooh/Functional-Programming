const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

/* 별그리기 */
_.go(
    L.range(1, 6),
    // L.map(s => _.go(
    //     L.range(s),
    //     L.map(_ => '*'),
    //     _.reduce((a,b) => `${a}${b}`),
    // )), -> 아래와 같은 코드
    L.map(L.range),
    L.map(L.map(_ => '*')),
    L.map(_.reduce((a,b) => `${a}${b}`)),

    _.reduce((a,b) => `${a}\n${b}`),
    console.log
)

const join = sep => _.reduce((a, b) => `${a}${sep}${b}`);

_.go(
    L.range(1, 6),
    L.map(L.range),
    L.map(L.map(_ => '*')),
    L.map(join('')),
    join('\n'),
    console.log
)

console.clear();

/* 구구단 */
_.go(
    L.range(2, 10),
    L.map(a => _.go(
        L.range(1, 10),
        L.map(b => `${a}x${b}=${a * b}`),
        join('\n'),
    )),
    join('\n---\n'),
    console.log,
)
