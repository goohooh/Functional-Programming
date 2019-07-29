const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const products = require('./products');
const log = console.log;

/***
 * 결과를 만드는 함수 reduce, take
 ***
 * - iterator에서 값을 꺼내 깨뜨림
 * - 그렇기 때문에 지연성을 가질 수 없음
 * - 연산을 시작하는 시작점 함수
 */

/* --- */