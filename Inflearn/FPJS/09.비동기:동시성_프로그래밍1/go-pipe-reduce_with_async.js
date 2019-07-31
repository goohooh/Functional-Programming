const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

/***
 * go, pipe, reduce에서 비동기 제어
 ***
 */
_.go(
    1,
    a => a + 10,
    a => Promise.resolve(a + 100),
    a => a + 1000,
    a => a + 10000,
    log,
);

// pipe는 go를, go는 reduce에게 모든 제어를 위임하므로 reduce만 수정

/* --- */

// 초기값이 Promise일 경우 reduce에서 처리하지 못하므로 go와 함께 수정
_.go(
    Promise.resolve(1),
    a => a + 10,
    a => Promise.resolve(a + 100),
    a => a + 1000,
    a => a + 10000,
    log,
);

/* --- */

_.go(
    Promise.resolve(1),
    a => a + 10,
    a => Promise.reject('error!'),
    a => log('-------'),
    a => a + 1000,
    a => a + 10000,
    log,
).catch(e => log(e));