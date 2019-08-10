const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

const users = [
    { name: 'AA', age: 35 },
    { name: 'BB', age: 26 },
    { name: 'CC', age: 28 },
    { name: 'CC', age: 34 },
    { name: 'EE', age: 23 },
];

/**
 * 명령형 습관 지우기. 만능 reduce? No!
 * - reduce + 복잡한 함수 + acc 보다
 * - map + 간단한 함수 + reduce
 */
console.log(
    _.reduce((total, user) => {
        total += user.age;
        return total;
    }, 0, users)
);

const add = (a, b) => a + b;
_.go(
    users,
    _.map(u => u.age), // reduce에서 계산한 값들을 같은 형으로 만들어준다
    _.reduce(add),
    console.log
)

const ages = L.map(u => u.age); // 조합 되기 쉬움
_.go(
    ages(users),
    _.reduce(add),
    console.log,
)

console.clear();

/**
 * map + filter + reduce
 */
_.go(
    users,
    ages,
    _.filter(a => a < 30),
    _.reduce(add),
    console.log,
)