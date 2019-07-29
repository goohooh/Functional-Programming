const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const log = console.log;

const join = _.curry((sep, iter) =>
    _.reduce((a, b) => `${a}${sep}${b}`, iter));

L.entries = function *(obj) {
    for(const k in obj) yield [k, obj[k]];
}

const queryStr = _.pipe(
    L.entries,
    L.map(([k,v]) => `${k}=${v}`),
    join('&'),
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }))

const users = [
    {age: 32},
    {age: 31},
    {age: 37},
    {age: 28},
    {age: 25},
    {age: 32},
    {age: 31},
    {age: 37},
];

const find = _.curry((f, iter) => _.go(
    iter,
    // _.filter(f),
    L.filter(f),
    _.take(1),
    ([a]) => a,
));

log(find(u => u.age < 30)(users));

_.go(
    users,
    L.map(u => u.age),
    find(n => n < 30),
    log,
);