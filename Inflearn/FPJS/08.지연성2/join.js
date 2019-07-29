const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const log = console.log;

const join = _.curry((sep, iter) =>
    _.reduce((a, b) => `${a}${sep}${b}`, iter));

L.entries = function *(obj) {
    for(const k in obj) yield [k, obj[k]];
}

const queryStr = _.pipe(
    // Object.entries,
    L.entries,
    L.map(([k,v]) => `${k}=${v}`),
    join('&'),
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }))
