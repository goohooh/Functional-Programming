const products = require('./products');
const log = console.log;

/**
 * reduce
 */
const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const i of iter) acc = f(acc, i);
    return acc;
};

log(reduce((a, c) => {
    return c + a;
}, 0, [1,2,3]));

log(reduce((a, c) => {
    return c + a;
}, [1,2,3]));

/* --- */

/**
 * iterable 프로토콜을 따르므로 숫자가 아닌 값도 다룰 수 있음
 **
 */

log(
    reduce(
        (total_price, product) => total_price + product.price, 0, products)
);

console.clear();
module.exports = reduce;
