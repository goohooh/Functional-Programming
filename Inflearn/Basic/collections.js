const g = require('./get');
const _ = require('./overview');

const values = data => _.map(data, identity);

// console.log(_.keys(_.users[0]));
// console.log(values(_.users[0]));
// console.log(_.map(identity)(_.users[1]))

// pluck
// pluck(users, 'age') => [33, 22, 11, ...] map + get?
console.log(_.pluck(_.users, 'age'));

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

console.log(
    _.min([1, 3, 4, -9, 10])
)

console.log(
    _.minBy([1, 3, 4, -9, 10], Math.abs)
)

console.log(
    _.maxBy([1, 3, 4, -19, 10], Math.abs)
)

_.go(
    _.users,
    _.filter(user => user.age < 30),
    _.minBy(user => user.age),
    console.log
);

_.go(
    _.users,
    _.reject(user => user.age >= 30),
    _.maxBy(user => user.age),
    g.getr('name'),
    console.log
);

_.go(
    _.users,
    _.groupBy(u => u.age - u.age % 10),
    console.log
)

_.go(
    _.users,
    _.groupBy(u => u.name),
    console.log
)

_.go(
    _.users,
    _.countBy(u => u.age - u.age % 10),
    console.log,
)

console.log('===========================');

_.go(
    _.users,
    _.reject(user => user.age < 20),
    _.countBy(user => user.age - user.age % 10),
    _.map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
    list => '<ul>' + list.toString() + '</ul>',
    // console.log
)
const f1 = _.pipe(
    _.countBy(user => user.age - user.age % 10),
    _.map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
    list => '<ul>' + list.toString() + '</ul>',
)
console.log(f1(_.users));

const f2 = _.pipe(
    _.reject(user => user.age < 20),
    f1
);

console.log(f1(_.users));