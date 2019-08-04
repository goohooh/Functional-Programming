const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

/**
 * 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take
 */
const delay500 = a => new Promise(resolve => {
    log('processing...');
    setTimeout(() => resolve(a), 500);
});

console.time('')
_.go(
    [1,2,3,4,5],
    L.map(a => delay500(a * a)),
    L.filter(a => a % 2),
    _.reduce(_.add),
    log,
    _ => console.timeEnd('')
);

/**
 * 위 상황을 병렬 처리
 */

const C = {};
C.reduce = _.curry((f, acc, iter) => iter
    ? _.reduce(f, acc, [...iter])
    : _.reduce(f, [...acc]));

console.time('C')
_.go(
    [1,2,3,4,5],
    L.map(a => delay500(a * a)),
    L.filter(a => a % 2),
    C.reduce(_.add),
    log,
    _ => console.timeEnd('C')
);
