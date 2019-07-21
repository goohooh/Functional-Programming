const _ = require('./lib/fx');
const products = require('./products');
const log = console.log;

/**
 * map, filter, reduce 중첩 사용과 함수형 사고
 */
const add = (a, b) => a + b;
log(
    _.reduce(
        add,
        _.map(
            p => p.price,
            _.filter(p => p.price < 20000,
                products
            )
        )
    )
);

// 연산만 바꿈
log(
    _.reduce(
        add,
        _.filter(
            p => p < 20000,
            _.map(p => p.price,
                products
            )
        )
    )
);

/* --- */

/**
 * iterable 프로토콜을 따르므로 숫자가 아닌 값도 다룰 수 있음
 **
 */