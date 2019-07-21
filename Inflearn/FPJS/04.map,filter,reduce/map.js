const products = require('./products');
const log = console.log;

/**
 * 이터러블 프로토콜을 다른 map의 다형성
 */
const map = (f, iter) => {
    const res = [];
    for (const i of iter) res.push(f(i));
    return res;
}

log(map(p => p.name, products))
log(map(p => p.price, products))

function *gen() {
    yield 2;
    yield 3;
    yield 4;
}
log(map(a => a * a, gen()));

let m = new Map();
m.set('a', 10);
m.set('b', 20);
log(new Map(map(([k, v]) => [k, v * 2], m)));

console.clear()
module.exports = map;