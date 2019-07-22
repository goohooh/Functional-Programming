const _ = require('./lib/fx');
const products = require('./products');
const log = console.log;

const go = (...args) => _.reduce((acc, f) => f(acc), args)
go(
    0,
    a => a + 1,
    a => a + 10,
    a => a + 100,
    log,
);

// 구현 1
// const pipe = (...fs) => (a) => go(a, ...fs);
// const f = pipe(
//     a => a + 1,
//     a => a + 10,
//     a => a + 100,
// );
// log(f(0));

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const f = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100,
);
log(f(0, 1));

const add = (a, b) => a + b;
go(
    products,
    products => _.filter(p => p.price < 20000, products),
    products => _.map(p => p.price, products),
    prices => _.reduce(add, prices),
    log,
);

/* --- */

/**
 * go + curry를 사용하여 더 읽기 좋은 코드 만들기
 */
 const curry = f =>
    (a, ..._) => _.length
        ? f(a, ..._)
        : (..._) => f(a, ..._);

const multi = curry((a, b) => a * b);
log(multi(1)(3))

const map = curry(_.map);
const filter = curry(_.filter);
const reduce = curry(_.reduce);

go(
    products,
    filter(p => p.price < 20000), // 커리된 함수를 리턴 -> go가 reduce하면서 products를 커리된 함수에 전달 -> 첫번째 인자였던 함수와 함께 filter 실행
    map(p => p.price),
    reduce(add),
    log,
);

console.clear();
/* --- */

/**
 * 함수 조합으로 함수 만들기
 * - 중복 제거
 */
// 구현 1
const total_price = pipe(
    map(p => p.price),
    reduce(add),
);
go(
    products,
    filter(p => p.price < 20000),
    total_price,
    log,
);
go(
    products,
    filter(p => p.price >= 20000),
    total_price,
    log,
);

// 구현 2
const base_total_price = predi => pipe(
    filter(predi),
    total_price,
);
go(
    products,
    base_total_price(p => p.price < 20000),
    log,
);
go(
    products,
    base_total_price(p => p.price >= 20000),
    log,
);