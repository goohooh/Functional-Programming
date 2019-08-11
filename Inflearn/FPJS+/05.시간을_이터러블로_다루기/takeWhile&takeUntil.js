const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');
const log = console.log;

_.go(
    [1,2,3,4,5,6,7,8,0,0,0],
    _.takeWhile(a => a), // a => !!a, 마치 while문 처럼
    _.each(log),
);

console.clear();

_.go(
    [0,0,0,1,2,3,4,5,6,7,8],
    _.takeUntil(a => a), // a => !!a, 마치 while문 처럼
    _.each(log),
);