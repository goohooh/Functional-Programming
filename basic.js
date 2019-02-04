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

// 리스트에서 홀수를 length만큼 뽑아서 제곱한 후 더하기
function f(iter, length) {
    let acc = 0;
    for (const a of take(length, map(a => a * a, filter(a => a % 2, iter)))) {
        acc += a;
    }

    // 함수 내부는 외부 세상에 영향을 끼치지 않는다.
    // log 함수 호출은 main에서 실행
    // 수학적 프로그래밍이 되도록 함수에선 return
    return acc;
}

function main() {
    log(f([1,2,3,4,5], 1));
    log(f([1,2,3,4,5], 2));
    log(f([1,2,3,4,5], 3));
}

main();