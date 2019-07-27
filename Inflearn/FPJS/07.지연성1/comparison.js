const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const products = require('./products');
const log = console.log;

/**
 * range, map, filter, take, reduce 중첩사용
 **
 */
_.go(
    _.range(10),
    _.map(n => n + 10),
    _.filter(n => n % 2),
    _.take(2),
    log
);
// 순서대로 호출되며 각 함수에서 순회 완료후 다음 함수로 넘어감

/* --- */

/**
 * L.range, L.map, L.filter, take, reduce 중첩사용
 **
 */
_.go(
    L.range(10),
    L.map(n => n + 10),
    L.filter(n => n % 2),
    _.take(2),
    log
);
// take부터 역으로 호출 됨
// 각 함수의 next() 호출로 인해 (for ... of)
// take -> filter -> map -> range -> map<evaluation> -> filter<evaluation> -> take or range ...
