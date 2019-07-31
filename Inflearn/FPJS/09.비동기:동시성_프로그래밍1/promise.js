const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

const delay100 = a => new Promise(resovle => 
    setTimeout(() => resovle(a), 100));

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;

const n1 = 10;
go1(go1(n1, add5), log);

const n2 = delay100(10);
const p = go1(go1(n2, add5), _ => _);
p.then(log);