const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

/**
 * 어떠한 값이든 이터러블 프로그래밍으로 다루기
 * - 이터러블로 이터러블 프로그래밍
 * - 객체를 제너레이터를 이용해서 이터레이터로 만들어서 이터러블 프로그래밍
 * - 어떤 제너레이터든 이터레이터로 만들어서 이터러블 프로그래밍
 */
const g1 = function *(stop) {
    let i = -1;
    while(++i < stop) {
        yield 10;
        if (false) yield 20;
        yield 30;
    }
}

console.log([...L.take(3, g1(10))]);

_.go(
    g1(10),
    L.take(2),
    _.reduce((a,b) => a + b),
    console.log
)