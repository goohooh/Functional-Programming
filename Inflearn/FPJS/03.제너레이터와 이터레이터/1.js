const log = console.log;

/**
 * 제너레이터
 * - iterator이자 iterable을 생성하는 함수
 */
function *gen() {
    yield 1;
    yield 2;
    yield 3;
    return 100;
}
const iter = gen();
log(iter[Symbol.iterator]() === iter)
log(iter.next())
for (const a of gen()) log(a);
console.clear();

/**
 * Infinity
 */
function *infinity(i = 0) {
    while (true) yield i++;
}

function *limit(l, iter) {
    for (const a of iter) {
        yield a;
        if (a === l) return;
    }
}

/**
 * Odd
 */
function *odds(l = 3) {
    for (const a of limit(l, infinity(1))) {
        if (a % 2) yield a;
    }
}

// for (const a of odds(3)) log(a);
// for (const a of odds(10)) log(a);


/* --- */

/**
 * for of, 전개 연산자, 구조 분해, 나머지 연산자
 **
 */
log(...odds(10));
log([...odds(10), ...odds(6)]);

const [head, ...tail] = odds(8);
log(head)
log(tail)

const [a, b, ...rest] = odds(8);
log(a)
log(b)
log(rest)
