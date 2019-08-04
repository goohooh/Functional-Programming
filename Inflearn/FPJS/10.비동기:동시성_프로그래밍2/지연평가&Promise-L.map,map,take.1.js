const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

/***
 * 지연 평가 + Promise - L.map, map, take
 ***
 */
_.go(
    [Promise.resolve(2), Promise.resolve(3), Promise.resolve(4)],
    L.map(a => a + 10), // L.map을 수정
    _.take(2),
    log,
);
_.go(
    [1,2,3,4],
    L.map(a => Promise.resolve(a + 10)), // L.map을 수정
    // L.map(a => a + 10), // L.map을 수정
    // _.take(3),
    _.takeAll,
    log,
);