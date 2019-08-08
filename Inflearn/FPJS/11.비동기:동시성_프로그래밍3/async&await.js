const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

function delay(a) {
    return new Promise(resolve => setTimeout(() => resolve(a), 500));
}
// await 라는 것은 promise를 의미함
async function f1() {
    const a = await delay(10);
    const b = await delay(15);
    log(a+b);
    return a + b;
}

log(f1()); // 리턴 값은 결국 promise

f1().then(log)
_.go(f1(), log);
(async () => {
    const a = await f1();
    log(a);
    const pa = f1();
    log(await pa);
})();