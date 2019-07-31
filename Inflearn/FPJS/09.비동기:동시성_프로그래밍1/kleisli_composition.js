const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

/***
 * Kleisli Compsition 관점에서 Promise
 ***
 * - Promise는 kleisli composition을 지원하는 도구라고 볼 수 있다.
 * - 오류가 있을 수 있을 수 있는 상황에서 함수 합성을 안전하게 할 수있는 규칙
 * - 수학적이다 -> 정확한 상수/변수로 함수 합성 -> 평가
 * - But, 현대 프로그래밍 = 상태 + 효과 + 외부 의존성
 * - 인자가 잘못 되거나, 인자가 제대로 왔어도 함수가 의존하고 있는 외부 상태에 의해
 *   결과를 제대로 정확히 전달하지 못하는 것을 해결하기 위한 함수 합성
 */

// f.g
// f(g(x)) = f(g(x)) 어느 시점의 f(g(x))라도 성립
// 실무에선 좌항의 f(g(x))가 어느 시점에서 달라지기 마련

// f(g(x)) = g(x) -> 만약 g(x)에서 에러가 발생하더라도 이 식이 성립하도록 합성하는 것
const users = [
    { id: 1, name: 'aa' },
    { id: 2, name: 'bb' },
    { id: 3, name: 'cc' },
];

const getUserById = id => 
    // _.find(u => u.id === id, users);
    _.find(u => u.id === id, users) || Promise.reject('없어요!');

const f = ({ name }) => name;
const g = getUserById;
/*
const fg = id => f(g(id));

log(fg(2));
users.pop();
users.pop(); // in real world...
log(fg(2));
// 함수 합성에 위험성이 생긴다
*/

/* --- */

const fg = id =>
    // Promise.resolve(id).then(g).then(f);
    Promise.resolve(id).then(g).then(f).catch(a => a);
users.pop();
users.pop();
fg(2).then(log);
