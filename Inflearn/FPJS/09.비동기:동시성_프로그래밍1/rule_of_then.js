const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

/***
 * promise.then의 중요한 규칙
 ***
 * - 프로미스가 중첩되더라도 한번의 then으로 값을 꺼내올 수 있다
 */
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(log);

Promise.resolve(Promise.resolve(1)).then(a => {
    log(a);
});

new Promise(resolve => resolve(new Promise(resolve => resolve(1)))).then(log);

