const _ = require('./lib/fx');
const products = require('./products');
const log = console.log;

const range = len => {
    let i = 0;
    let res = [];
    while (i < len) res.push(i++);
    return res;
};

log(_.reduce(_.add, range(5))); // [0, 1, 2, 3, 4]
log(_.reduce(_.add, range(10)))

const L = {};
L.range = function *(l) {
    let i = 0;
    while (i < l) {
        yield i++;
    };
};

log(_.reduce(_.add, L.range(5)));
log(_.reduce(_.add, L.range(10)))

/****************************
 * 평가 시점이 다르다.
 * 제네레이터에서 값을 꺼낼 때 평가
 * reduce가 실행될 때 값을 yield
 ****************************/


/* --- */

/**
 * Performance Test
 */
const test = (name, time, f) => {
    console.time(name);
    while (time--) f();
    console.timeEnd(name);
}

test('range', 10, () => _.reduce(_.add, range(1000000)))
test('L.range', 10, () => _.reduce(_.add, L.range(1000000)))

const take = (l, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === l ) return res;
    }
    return res;
}

log(take(6,L.range(100)));
test('take', take(6,range(1000000)))
test('take with L', take(6,L.range(1000000)))
test('take with L Infinity', take(6,L.range(Infinity)))