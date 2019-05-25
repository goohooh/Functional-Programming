const fp = require('./fp');

/***
 * Monad
 ***
 * - 수학적으로 f(g(x)) = g(f(x))는 언제나 성립
 * - 현실 프로그래밍은 불가
 * - 안전한 함수 합성(f . g)을 위함
 * 
 * - [1] : 박스 안에 값(JS에서 Array는 모나드)
 * - f(g(x)) = x
 */

const g = a => a + 1;
const f = a => a * a;
const log = console.log;

/* 예시 */
[1].map(g).map(f).forEach(a => log(a));
[1,2,3,4,5].map(g).map(f).forEach(a => log(a));
// 이처럼 값이 없어도, 혹은 잘못 들어와도 아무것도 일어나지 않는 것
[].map(g).map(f).forEach(a => log(a));

log(f(g(1))); // 모나드 아님

/* Kleisli Composition(Promise) : f(g(x)) = g(x) */
Promise.resolve(1).then(g).then(f).then(a => log(a));

// Array의 목적과는 다르게
// 안전한 비동기 처리를 위한 Promise
// Future monad
const g2 = a => JSON.parse(a);
const f2 = ({key: k}) => k;
const fg = x => Promise.resolve(x)
    .then(g2)
    .then(f2);

fg('{"key": 10}').then(log);
fg('{"key: 10}').catch(_ => 'Oops...sorry!').then(log);

const delay = (time, a) => new Promise(resolve =>
    setTimeout(() => resolve(a), time));

delay(300, 7).then(log); // 이처럼 then, then, then...을 위한 Promise가 아닌

const a = delay(300, 7); // Promise를 일급 객체(값)으로 다루는 것이 중요
log(a instanceof Promise);
if (true) {
    a.then(log); // 비동기 상황을 -> 값으로 만들어 사용
}

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const c = 777;
const d = delay(500, 5);
go1(c, log);
go1(d, log);

const value = fp.go(Promise.resolve(1),
    a => a + 1,
    a => delay(1500, a + 123123),
    log
);

log(value); // 원하는 시점에 평가

async function af() {
    const a = await fp.go(Promise.resolve(1),
        a => a + 300,
        a => delay(500, a + 10000),
        a => delay(500, a + 20000),
    );
    const b = await fp.go(Promise.resolve(1),
        a => a + 300,
        a => delay(400, a + 10),
        a => delay(600, a + 20),
    );
    log(a, b);
}
af();