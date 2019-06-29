const c = require("./currying");
/**
 * Object에 있는 값을 안전하게 참조
 */
 const get = (obj, key) => obj === null
    ? undefined
    : obj[key];
const _getr = c.curryr(get);
const _get = c.curry(get);

const users = [
    { name: 'a', age: 21, family: [
        { name: 'a1', age: 53 }, { name: 'a2', age: 47 },
        { name: 'a3', age: 16 }, { name: 'a4', age: 14 },
    ]},
    { name: 'b', age: 24, family: [
        { name: 'b1', age: 58 }, { name: 'b2', age: 51 },
        { name: 'b3', age: 10 }, { name: 'b4', age: 22 },
    ]},
    { name: 'c', age: 31, family: [
        { name: 'c1', age: 64 }, { name: 'c2', age: 62 },
    ]},
    { name: 'd', age: 20, family: [
        { name: 'd1', age: 41 }, { name: 'd2', age: 42 },
        { name: 'd3', age: 11 }, { name: 'd4', age: 7 },
    ]},
];

const getName = _get(users[0]);
// console.log(getName('name'));

// 역으로
const getNameR = _getr('name');
// console.log(getNameR(users[2]));

module.exports.get = _get;
module.exports.getr = _getr;