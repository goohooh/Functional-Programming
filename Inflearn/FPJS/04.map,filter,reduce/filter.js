const products = require('./products');
const log = console.log;

/**
 * filter
 */
const filter = (f, iter) => {
    let res = [];
    for (const i of iter) {
        if (f(i)) res.push(i);
    }
    return res;
}
log(...filter(p => p.price > 20000, products))

console.clear();
module.exports = filter;
