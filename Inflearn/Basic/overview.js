const g = require('./get');
const c = require('./currying');

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
const length = g.getr("length");

const isObject = obj => typeof obj === "object" && !!obj;
const keys = obj => isObject(obj) ? Object.keys(obj) : [];

const each = (list, iter) => {
    const _keys = keys(list);
    for(let i = 0; i < length(_keys); i++) {
        iter(list[_keys[i]]);
    }
    return list;
};

const map = (list, mapper) => {
    const newList = [];
    each(list, val => newList.push(mapper(val)));
    return newList;
};

const filter = (list, predi) => {
    const newList = [];
    each(list, val => predi(val) && newList.push(val));
    return newList;
};

const negate = func => val => !func(val);

const identity = v => v;


const rest = (list, num) => Array.prototype.slice.call(list, num || 1);

const reduce = (list, iter, memo) => {
    if (!memo) {
        memo = list[0];
        list = rest(list);
    }
    each(list, val => {
        memo = iter(memo, val);
    })
    return memo;
}
// console.log(reduce([1,2,3,4], (a, b) => a + b));

// 함수만 받아 함수를 리턴하는 함수
const pipe = (...fns) =>
    arg => reduce(
        fns,
        (arg, fn) => fn(arg),
        arg
    );


const f = pipe(
    a => a + 1,
    a => a * 2,
)
// console.log( f(4) );

const go = (arg, ...fns) => {
    return pipe.apply(null, fns)(arg);
};

// go(
//     2,
//     a => a + 1,
//     a => a * 2,
//     a => a * a,
//     console.log
// );

// go(
//     users,
//     users => filter(users, user => user.age < 30),
//     users => map(users, g.getr('name')),
//     console.log
// )

const cmap = c.curryr(map);
const cfilter = c.curryr(filter);

const compact = cfilter(identity);

const reject = (list, predi) => cfilter(list, negate(predi));

const find = c.curryr((list, predi) => {
    const _keys = keys(list);
    for(let i = 0, len = _keys.length; i < len; i++) {
        const val = list[_keys[i]];
        if (predi(val)) return val;
    }
});

const findIndex = c.curryr((list, predi) => {
    const _keys = keys(list);
    for(let i = 0, len = _keys.length; i < len; i++) {
        if (predi(list[_keys[i]])) return i;
    }
    return -1;
});

const some = (list, predi) => findIndex(list, predi || identity) !== -1;

const every = (list, predi) => findIndex(list, negate(predi || identity)) === -1

// go(
//     users,
//     cfilter(user => user.age < 30),
//     cmap(g.getr('name')),
//     console.log
// );

each(null, console.log);
// console.log(map(null, v => v))

// Object.keys(null)의 경우 에러
keys(null);

// each({
//     13: 'phil',
//     23: 'noah',
//     99: 'ryu',
// }, name => console.log(name));

// console.log(
//     map({
//         13: 'phil',
//         23: 'noah',
//         99: 'ryu',
//     }, name => name.toUpperCase())
// );

// go(
//     {
//         13: 'phil',
//         23: 'noah',
//         99: 'ryu',
//     },
//     cmap(name => name.toUpperCase()),
//     console.log
// );


module.exports = {
    isObject,
    keys,
    each,
    find,
    findIndex,
    some,
    every,
    map: cmap,
    filter: cfilter,
    reject,
    compact,
    rest,
    reduce,
    pipe,
    go,
    users
};
