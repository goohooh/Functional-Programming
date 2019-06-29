const g = require('./get');
const _ = require('./overview');

const identity = v => v;
const values = data => _.map(data, identity);

// console.log(_.keys(_.users[0]));
// console.log(values(_.users[0]));
// console.log(_.map(identity)(_.users[1]))

// pluck
// pluck(users, 'age') => [33, 22, 11, ...] map + get?
const pluck = (data, key) => _.map(data, g.getr(key));
console.log(pluck(_.users, 'age'));