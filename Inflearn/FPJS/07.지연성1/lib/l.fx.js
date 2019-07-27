const { curry } = require("./fx");

const range = function *(l) {
    let i = 0;
    while (i < l) {
        yield i++;
    };
};
const map = curry(function *(f, iter) {
    for (const a of iter) yield f(a);
});

const filter = curry(function *(f, iter) {
    for (const a of iter) if (f(a)) yield a;
});

module.exports = {
    range,
    map,
    filter
}