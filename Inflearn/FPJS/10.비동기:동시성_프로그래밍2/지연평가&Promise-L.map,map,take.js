const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

/***
 * 지연 평가 + Promise - L.map, map, take
 ***
 */
_.go(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    L.map(a => a + 10), // L.map을 수정
    _.take(2),
    log,
);
