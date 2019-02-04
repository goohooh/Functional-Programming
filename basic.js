const log = console.log;

function *filter(f, iter) {
    for (const a of iter) {
        if (f(a)) yield a;
    }
}

function *map(f, iter) {
    for (const a of iter) {
        yield f(a);
    }
}

function take(length, iter) {
    const res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length === length) return res;
    }
    return res;
}

function reduce(f, acc, iter) {
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
}

const add = (a, b) => a + b;

/***
 * todo : go(10, a => a + 1, a => a + 10, log) 순서대로 실행
 ***
 * 1. 인자를 리스트로 본다
 * 2. 리스트의 값들을 적절히 평가한다
 */
const go = (a, ...fs) => reduce((v, f) => f(v), a, fs);

// 리스트에서 홀수를 length만큼 뽑아서 제곱한 후 더하기 
function f(iter, length) {
    // 명령형 프로그래밍에서 if, 값, 증가, for문 같이 추상화 된것을
    // FP에선 함수를 이용해 같은 동작을 한다.
    // 읽는 순서는 오른쪽에서 왼쪽으로
    return reduce(
        add,
        0,
        take(length, map(a => a * a, filter(a => a % 2, iter))));

    // 함수 내부는 외부 세상에 영향을 끼치지 않는다.
    // log 함수 호출은 main에서 실행
    // 수학적 프로그래밍이 되도록 함수에선 return
    // return acc;
}

function main() {
    // log(f([1,2,3,4,5], 1));
    // log(f([1,2,3,4,5], 2));
    // log(f([1,2,3,4,5], 3));
    go(10, a => a + 1, a => a + 10, log);
}

main();