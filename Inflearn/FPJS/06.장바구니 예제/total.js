const _ = require('./lib/fx');
const products = require('./products');
const log = console.log;

const add = (a, b) => a + b;

// 총 수량
/*
const total_quantity = products => _.go(
    products,
    _.map(product => product.quantity),
    _.reduce((a, b) => a + b),
);
*/
// 위와 동일
const total_quantity = _.pipe(
    _.map(product => product.quantity),
    _.reduce((a, b) => a + b),
);
log(total_quantity(products));

// 합산
const total_price = _.pipe(
    _.map(p => p.quantity * p.price),
    _.reduce((a, b) => a + b),
)
log(total_price(products));

/* --- */

/**
 * 추상화 레벨 높이기
 */
let sum = (f, iter) => _.go(
    iter,
    _.map(f),
    _.reduce(add),
);
// const total_quantity2 = products => sum(p => p.quantity, products);
// const total_price2 = products => sum(p => p.price * p.quantity, products);

sum = _.curry(sum);
const total_quantity2 = sum(p => p.quantity);
const total_price2 = sum(p => p.price * p.quantity);

log(total_quantity2(products));
log(total_price2(products));

/* --- */

/**
 * 함수 조합으로 함수 만들기
 * - 중복 제거
 */