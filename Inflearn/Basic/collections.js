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

console.log(
    _.filter(_.users, user => user.age > 30)
)
// reject : filter의 반대
console.log(
    _.reject(_.users, user => user.age > 30)
)

// compact : truthy 값들만 남게함
console.log(
    _.compact([1, 2, 0, null, false, [], {}])
)

console.log(
    _.findIndex(_.users, u => u.age === 31)
)

_.go(
    _.users,
    _.find(user => user.age >= 30),
    g.getr('name'),
    console.log,
);

console.log(
    _.some([1, 2, 5, 10, 20], v => v > 20)
)

console.log(
    _.every([1, 2, 5, 10, 20], v => v > 1)
)

console.log(
    _.some([undefined, null, 0, false, 10])
)

console.log(
    _.every([undefined, null, 0, false, 10])
)

console.log(
    _.every([1, 3, 10])
)
