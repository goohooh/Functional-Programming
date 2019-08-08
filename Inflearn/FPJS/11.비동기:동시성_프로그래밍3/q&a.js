const _ = require('./lib/fx');
const L = _.L;
const C = _.C;
const log = console.log;

/**
 * Array.prototype.map이 있는데 왜 FxJS의 map 함수가 필요한지?
 */

function delay(a) {
    return new Promise(resolve => setTimeout(() => resolve(a), 500));
}

// function f2() {
async function f2() {
    const list = [1,2,3,4];
    // const res = list.map(a => delay(a * a)); - promise만 찍힘
    // const res = list.map(async a => await delay(a * a)); - async/await?
    const res = await list.map(async a => await delay(a * a)); // - 여전히 promise만 찍힘
    // map이 promise를 제어해 주지 않기 때문
    log(res);
}
// f2();

async function f3() {
    const list = [1,2,3,4];
    const res = await _.map(a => delay(a * a), list); // - 여전히 promise만 찍힘
    log(res);
}
// f3();

async function f4() {
    const list = [1,2,3,4];
    // const res = await _.map(a => delay(a * a), list); // - 여전히 promise만 찍힘
    // log(res); - [1,4,9,16] 잘 찍힌다. 그렇다면? 아래처럼 했을 땐?
    return await _.map(a => delay(a * a), list); // - 여전히 promise만 찍힘
}
// f4();
// log(f4()); // await로 풀었음에도 promise가 찍힘..

// (async () => {
//     log(await f4()); // 언제 이 짓을 하고 있냐~ 이말이야
// })();


/**
 * async/await로 제어할 수 있는데 왜 파이프 라인이 필요한지?
 **
 * - 서로 해결하고자 하는게 다르다
 * - async/await: then then보다 보기 쉬운 문장으로 다루기 위해(체인을 풀기위해)
 * - pipe line: 명령형 프로그래밍을 하지 않고, 안전하게 함수를 합성하기 위해
 */




/**
 * async/await와 파이프 라인을 같이 사용하나요?
 **
 * - 서로 해결하고자 하는게 다르다
 * - async/await: then then보다 보기 쉬운 문장으로 다루기 위해(체인을 풀기위해)
 * - pipe line: 명령형 프로그래밍을 하지 않고, 안전하게 함수를 합성하기 위해
 */

async function f5(list) {
    const r1 = await _.go(list,
        L.map(a => delay(a * a)),
        L.filter(a => delay(a % 2)),
        L.map(a => delay(a + 1)),
        C.take(2),
        _.reduce((a, b) => delay(a + b)),
    );
    const r2 = await _.go(list,
        L.map(a => delay(a * a)),
        L.filter(a => delay(a % 2)),
        _.reduce((a, b) => delay(a + b)),
    );

    const r3 = await delay(r1 + r2);

    return r3 + 10;
    // return r1 + r2 
}

// _.go(f5([1,2,3,4,5,6,7,8]), a => log(a, 'f5'))



/**
 * 동기 상황에서 에러핸들링?
 **
 * - try catch...?
 */



/**
 * 비동기 상황에서 에러핸들링?
 **
 * - fx면 다 돼
 */




/**
 * 비동기 에러핸들링에서 파이프라인의 이점은?
 **
 */

