const curry = fn => (...args) => args.length === 2
    ? fn(...args)
    : b => fn(args[0], b);

const add = curry((a, b) => a + b);

// console.log(add(3, 7));
// console.log(add(5)(8));

// curry right
const curryr = fn => (...args) => args.length === 2
    ? fn(...args)
    : b => fn(b, args[0]);

const sub = curryr((a, b) => a - b);

// console.log(sub(10, 5))
// console.log(sub(1)(5));

module.exports = {
    curry,
    curryr,
};
