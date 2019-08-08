const _ = require('./lib/fx');
const L = _.L;
const C = _.C;
const log = console.log;

/**
 * 즉시 병렬 평가하기 - C.map, C.filter
 */

/*
const delay500 = a => new Promise(resolve => {
    log('processing...');
    setTimeout(() => resolve(a), 500);
});

_.map(a => delay500(a * a), [1,2,3,4,5,6]).then(log);
_.filter(a => delay500(a % 2), [1,2,3,4,5,6]).then(log);
C.map(a => delay500(a * a), [1,2,3,4,5,6]).then(log);
C.filter(a => delay500(a % 2), [1,2,3,4,5,6]).then(log);
*/

/* --- */

/**
 * 즉시, 지연, Promise, 병렬적 조합
 */
const delay500 = (a, name) => new Promise(resolve => {
    log(name, a);
    setTimeout(() => resolve(a), 500);
});

console.time('')
_.go(
    [1,2,3,4,5,6,7,8],
    // _.map(a => delay500(a * a, 'map 1')),
    // _.filter(a => delay500(a % 2, 'filter 1')),
    // _.map(a => delay500(a + 1, 'map 2')), // - 엄격함
    // _.take(3),

    // L.map(a => delay500(a * a, 'map 1')),
    // L.filter(a => delay500(a % 2, 'filter 1')),
    // L.map(a => delay500(a + 1, 'map 2')),  // - 퍙가 최소화
    // _.take(3),

    // L.map(a => delay500(a * a, 'map 1')),
    // C.filter(a => delay500(a % 2, 'filter 1')), // - map에서 미루고 filter에서 병렬
    // L.map(a => delay500(a + 1, 'map 2')),
    // _.take(3),

    L.map(a => delay500(a * a, 'map 1')),
    L.filter(a => delay500(a % 2, 'filter 1')), 
    L.map(a => delay500(a + 1, 'map 2')),
    C.reduce(_.add), // - 마지막에 병렬
    log,
    _ => console.timeEnd(''),
);
// 상황에 맞추어 전략을 짜서 평가
// 부하 - 평가 최소화 - 속도 : 이미지 연산, DB 연산