const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

/**
 * reduce 보조 함수를 간단하게 하면 좋은 점을 살펴보자
 */
const obj1 = {
    a: 1,
    b: undefined,
    c: 'CC',
    d: 'DD',
}; // -> a=1&c=CC&d=DD

function query1(obj) {
    let res = [];
    for (const k in obj) {
        const v = obj[k];
        if (v === undefined) continue;
        res.push(`${k}=${v}`);
    }
    return res.join('&')
}
console.log(query1(obj1));

/* --- */

function query2(obj) {
    return Object
        .entries(obj)
        .reduce((queryArr, [k,v]) => {
            if (v === undefined) return queryArr;
            queryArr.push(`${k}=${v}`);
            return queryArr;
        }, [])
        .join('&');
}
console.log(query2(obj1));

/* --- */

function query3(obj) {
    return Object
        .entries(obj)
        .filter(([_,v]) => v !== undefined)
        .reduce((queryArr, [k,v]) => {
            queryArr.push(`${k}=${v}`);
            return queryArr;
        }, [])
        .join('&');
}
console.log(query3(obj1));

/* --- */

function query4(obj) {
    return Object
        .entries(obj)
        .filter(([_,v]) => v !== undefined)
        .map(([k,v]) => `${k}=${v}`)
        .reduce((queryArr, token) => {
            queryArr.push(token);
            return queryArr;
        }, [])
        .join('&');
}
console.log(query4(obj1));

/* --- */

function query5(obj) {
    return _.go(
        obj,
        Object.entries,
        _.reject(([_,v]) => v === undefined),
        _.map(([k,v]) => `${k}=${v}`),
        _.reduce((q, t) => `${q}&${t}`),
    )
}
console.log(query5(obj1));

/* --- */

const join = _.curry((sep, iter) => 
    _.reduce((a,b) => `${a}${sep}${b}`, iter));

function query6(obj) {
    return _.go(
        obj,
        Object.entries,
        _.reject(([_,v]) => v === undefined),
        _.map(([k,v]) => `${k}=${v}`),
        join('&'),
    )
}
console.log(query6(obj1));

/* --- */

const query7 = _.pipe(
    Object.entries,
    L.reject(([_,v]) => v === undefined),
    L.map(join('=')),
    join('&'),
);
console.log(query7(obj1));

/**
 * queryToObject
 */
const split = _.curry((sep, str) => str.split(sep));

const queryToObject = _.pipe(
    split('&'),
    L.map(split('=')),
    L.map(([k,v]) => ({ [k]: v })),
    _.reduce(Object.assign)
);

console.log(queryToObject('a=1&c=CC&d=DD'));