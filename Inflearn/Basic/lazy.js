const _ = require('partial-js');
const L = _.L;

let mi = 0;
let fi = 0;
_.go(
    _.range(100),
    _.map(v => {
        ++mi;
        return v * v;
    }),
    _.filter(v => {
        ++fi;
        return v % 2;
    }),
    _.take(5),
    console.log,
)
console.log(mi, fi)
// 100번 * 2 의 연산
// 지연평가를 통해 최적화
mi = 0;
fi = 0;
_.go(
    _.range(100),
    L.map(v => {
        ++mi;
        return v * v;
    }),
    L.filter(v => {
        ++fi;
        return v % 2;
    }),
    // L.take(5),
    L.some(v => v > 30),
    console.log,
);
// 끝나는 함수, take, some, find, every
console.log(mi, fi)