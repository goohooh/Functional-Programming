const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');
const log = console.log;

const track = [
    { cars: ['철수', '영희', '철희','영수'] },
    { cars: ['하든', '커리', '듀란트','탐슨'] },
    { cars: ['폴', '어빙', '릴라드','맥컬럼'] },
    { cars: ['스파이더맨', '아이언맨'] },
    { cars: [] },
];

_.go(
    L.range(Infinity),
    L.map(i => track[i]),
    L.map(({ cars }) => cars),
    L.map(_.delay(1500)),
    // L.takeWhile(({ length }) => length === 4),
    L.takeUntil(({ length }) => length < 4),
    L.flat,
    L.map(car => `${car} 출발!`),
    _.each(log),
);