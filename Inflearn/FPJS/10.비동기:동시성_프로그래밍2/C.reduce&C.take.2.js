const _ = require('./lib/fx');
const L = _.L;
const C = _.C;
const log = console.log;

/**
 * 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take
 */
const delay500 = a => new Promise(resolve => {
    log('processing...');
    setTimeout(() => resolve(a), 500);
});

// console.time('')
// _.go(
//     [1,2,3,4,5],
//     L.map(a => delay500(a * a)),
//     L.filter(a => delay500(a % 2)),
//     L.map(a => delay500(a * a)),
//     C.reduce(_.add),
//     log,
//     _ => console.timeEnd('')
// ); // Uncaugth error(in promise) nop

/**
 * 콜스택에서 에러 예시
 * - C.reduce 수정
 */
// const p = Promise.reject('hmm..'); // 여기서 uncaught 에러가 찍힘

// const a = Promise.reject('hmm..'); 
// a.catch(a => a);
// a.catch(a => log(a, 'hey'))

/* --- */
// console.time('')
// _.go(
//     [1,2,3,4,5,6,7,8,9],
//     L.map(a => delay500(a * a)),
//     L.filter(a => delay500(a % 2)),
//     L.map(a => delay500(a * a)),
//     C.reduce(_.add),
//     log,
//     _ => console.timeEnd('')
// );
/* --- */

const cTake = _.curry((l, iter) => _.take(l, _.catchNoop([...iter])))

_.go(
    [1,2,3,4,5,6,7,8,9],
    L.map(a => delay500(a * a)),
    L.filter(a => delay500(a % 2)),
    L.map(a => delay500(a * a)),
    cTake(2),    // - 자원을 써서 빠르게 처리
    // _.take(2),      // - 느리지만 명령을 최소화
    C.reduce(_.add),
    log,
    _ => console.timeEnd('')
);