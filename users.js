const fp = require('./fp');

const log = console.log;

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

// 자유롭게 로직을 변경할 수 있다!
fp.go(
    users,
    fp.L.map(u => u.family),
    fp.L.flat,
    fp.L.filter(u => u.age < 20),
    fp.L.map(u => u.age),
    fp.take(3),
    fp.reduce(fp.add),
    log,    
);