const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

_.go(
    [1,2,3,4],
    L.map(a => Promise.resolve(a * a)),
    L.filter(a => Promise.resolve(a % 2)),
    _.reduce(_.add),
    log,
);

_.go(
    [1,2,3,4, 5],
    L.map(a => Promise.resolve(a * a)),
    L.filter(a => Promise.resolve(a % 2)),
    _.reduce(_.add),
    log,
);

/**
 * 지연 평가 + Promise의 효율성
 **
 * - 아래 map/filter에서 헤비한 비동기 작업을 원하는 만큼만 실행할 수 있다 
 */
_.go(
    [1,2,3,4,5,6,7,8],
    L.map(a => new Promise(resolve => setTimeout(() => resolve(a * a), 1000))),
    L.filter(a => new Promise(resolve => setTimeout(() => resolve(a % 2), 1000))),
    _.take(2),
    // _.reduce(_.add),
    log,
);