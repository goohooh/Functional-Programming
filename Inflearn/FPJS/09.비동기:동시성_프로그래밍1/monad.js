const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

/***
 * 합성 관점에서 Promise와 Monad
 ***
 * - f . g -> g의 결과가 f에 적용
 * - f(g(x))
 * - JS에서 직접 제공하는 interface는 없음
 * - 하지만 안전한 함수 합성을 위해 알아야 할 도구
 */

[1] // 이 박스가 모나드라 할 수 있다

const g = a => a + 1;
const f = a => a * a;

log(f(g(1)));

// 무의미한 값이라도 출력한다 -> 안전하게 합성되지 않았다
// 어떻게 하면 안전하게 인자를 전달할 수 있을까?
log(f(g())); // NaN

 // 일단은 안전하지만.. 이 "array"는 사용자에게 필요하지 않다
log([1].map(g).map(f));

// 이제 우리가 원하는 값을 얻을 수 있다
// 외부 세상에 효과를 준다 -> log를 찍든 html에 출력하든
// 여기서는 forEach의 콜백
log([1].map(g).map(f).forEach(r => log(r)));

// 박스 안에 값이 있는지 없는지에 따라
// forEach가 실행 되던가 안되던가(안전하다는 뜻)
log([].map(g).map(f).forEach(r => log(r)));

console.clear();
/* --- */

Promise.resolve(1).then(g).then(f).then(r => log(r))
Promise.resolve().then(g).then(f).then(r => log(r))

// promise는 대기가 일어난 상황에서 합성을 안전하게 하려는 경향이 있다
// promise도 함수 합성의 시기(상황)를 안전하게 하는 monad
new Promise(resolve => setTimeout(() => resolve(2), 100))
    .then(g).then(f).then(r => log(r));