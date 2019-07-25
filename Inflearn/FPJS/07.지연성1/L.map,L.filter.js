const _ = require('./lib/fx');
const products = require('./products');
const log = console.log;

/**
 * 이터러블 중심 프로그래밍에서 지연 평가
 **
 * - 제때 계산법
 * - 느긋한/영리한 계산법
 * - 제네레이터이터레이터 프로토콜 기반 구현
 */

/**
 * L.map, L.filer
 **
 * - 바로 Array를 리턴하지 않음
 * - iterator.next 호출을 통해 하나 씩 평가
 */
const L = {};
L.map = function *(f, iter) {
    for (const a of iter) yield f(a);
}
// const it = L.map(a => a + 10, [1,2,3]);
// log(it.next())
// log(it.next())

L.filter = function *(f, iter) {
    for (const a of iter) if (f(a)) yield a;
}
const it = L.filter(a => a % 2, [1,2,3,4]);
log(it.next())
log(it.next())
log(it.next())


/* --- */