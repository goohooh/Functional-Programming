const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

function _f1(limit, list) {
    let acc = 0;
    for (const a of list) {
        if (a % 2) {
            const b = a * a;
            acc += b;
            if (--limit === 0) break;
        }
    }
    console.log(acc);
}

/* if를 filter로 */
function __f1(limit, list) {
    let acc = 0;
    for (const a of L.filter(a => a % 2, list)) {
        if (a % 2) {
            const b = a * a;
            acc += b;
            if (--limit === 0) break;
        }
    }
    console.log(acc);
}

/* 값 변화 후 변수 할당을 map으로 */
/* break를 take로 */
function ___f1(limit, list) {
    let acc = 0;
    for (const a of L.take(limit, L.map(a => a * a, L.filter(a => a % 2, list)))) {
        acc += a;
    }
    console.log(acc);
}

/* 축약 및 합산을 reduce로 */
function ____f1(limit, list) {
    console.log(
        _.reduce((acc, a) => acc += a,
            0,
            L.take(limit,
                L.map(a => a * a,
                    L.filter(a => a % 2, list))))
    );
}

/* go */
const add = (a, b) => a + b;
function f1(limit, list) {
    _.go(
        list,
        L.filter(a => a % 2),
        L.map(a => a * a),
        L.take(3),
        _.reduce(add),
        console.log
    );
}


// f1(3, [1,2,3,4,5,6,7,8,9,10]);

/* while을 each로 */
function _f2(end) {
    let i = 0;
    while (i < end) {
        console.log(i);
        i++;
    }
}

function _f2(end) {
    _.each(console.log, L.range(end));
}

function __f2(end) {
    let i = 1;
    while (i < end) {
        console.log(i);
        i += 2;
    }
}
function f2(end) {
    _.each(console.log, L.range(1, end, 2));
}

// f2(10);

/* 효과를 each로 구분 */
function f3(end) {
    // each -> effect가 있다
    _.go(
        L.range(1, end, 2),
        _.each(console.log)
    )
}

f3(10)