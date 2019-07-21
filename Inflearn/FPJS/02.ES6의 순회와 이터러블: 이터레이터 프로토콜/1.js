const _ = require('../../partial.min.js');
const log = console.log;

/*
기존과 달라진 ES6의 리스트 순회
for i++ -> for of
*/
const str = 'abc';
// for (const a of str) log(a)

/**
 * Array
 */
const arr = [1,2,3];
// for (const a of arr) log(a);

/**
 * Set
 */
const set = new Set(arr);
// for (const a of set) log(a);
// log(set[0]);

/**
 * Map
 */
const map = new Map([['a', 1],['b', 2],['c', 3]]);
for (const a of map) log(a)
for (const a of map.keys()) log(a)
for (const a of map.values()) log(a)
for (const a of map.entries()) log(a)

// arr, set, map에 각각 Symbol.iterator라는 메서드 존재

/* --- */

/**
 * 이터러블/이터레이터 프로토콜
 **
 * - 이터러블: iterator를 리턴하는 [Symbol.iterator]()를 가진 값
 * - 이터레이터: { value, done } 객체를 리턴하는 next()를 가진 값
 * - 이터러블/이터레이터 프로토콜: 이터러블을 for ... of, 전개 연산자 등과 함께 동작하도록 한 규약
 */

const arr2 = [1,2,3];
const iter = arr2[Symbol.iterator]();
iter.next();
// for (const a of iter) log(a);

/**
 * 사용자 정의 이터러블
 **
 */
const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i === 0 ? { done: true } : { value: i--, done: false };
            }
        }
    }
}

const iterator = iterable[Symbol.iterator]();
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// for (const a of iterable) log(a);

// Fail: it's not well-formed iterator
// for (const a of iterator) log(a);

const iterable2 = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i === 0 ? { done: true } : { value: i--, done: false };
            },
            [Symbol.iterator]() {
                return this;
            }
        }
    }
}
const iterator2 = iterable2[Symbol.iterator]();
// iterator2.next();
for (const a of iterator2) log(a);

// document.querySelectorAll('*')[Symbol.iterator]();

log([...arr, ...set, ...map.values()])