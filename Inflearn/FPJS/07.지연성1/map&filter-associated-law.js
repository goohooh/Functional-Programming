const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const products = require('./products');
const log = console.log;

_.go(
    _.range(10),
    _.map(n => n + 10),
    _.filter(n => n % 2),
    _.take(2),
    log
);

_.go(
    L.range(10),
    L.map(n => n + 10),
    L.filter(n => n % 2),
    _.take(2),
    log
);

/* --- */

/***
 * map, filter 계열 함수들이 가지는 결합 법칙(즉시 실행이든, 지연 평가든 모두)
 ***
 *
 * - 사용하는 데이터가 무엇이든지(어떤 라이브러리에서 사용하는 데이터 형식이라도)
 * - 사용하는 보조 함수가 순수 함수라면 무엇이든지
 * - 아래와 같이 결합한다면 둘 다 결과가 같다.
 * 
 **
 * [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
 *  =
 * [[mapping, filtering, mapping], [mapping, filtering, mapping]]
 */
