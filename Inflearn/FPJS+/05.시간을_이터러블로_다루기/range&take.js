const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

/**
 * range와 take의 재해석
 */
_.go(
    _.range(10), // 0부터 9까지 배열     - 둘다 한번만 실행하고 그치는
    _.take(3), // 앞에서 부터 3개만 자르기 - 유틸성 함수라고 볼 수있다
    _.each(console.log),
);

_.go(
    L.range(10), // 0부터 9까지 배열 이터러블 -> 최대 10번 일어날 일
    L.take(3), // 최대 3개의 값이 필요 -> 최대 3번의 일을 수행
    _.each(console.log),
);

_.go(
    L.range(10),
    L.map(_.delay(500)),
    L.filter(a => a % 2),
    L.take(3),
    _.each(console.log),
);

_.go(
    L.range(10),
    L.map(_.delay(500)),
    L.filter(a => a % 2),
    L.map(_ => new Date()),
    L.take(3),
    _.each(console.log),
);

// range, take가 단순히 배열을 만들고 
// 값을 취하는 완성된 값으로서의 함수가 아니라
// for문이나 if문 같은 언어의 문법으로서 사용될 수 있다