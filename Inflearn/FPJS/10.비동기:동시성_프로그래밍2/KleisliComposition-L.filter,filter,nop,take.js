const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

_.go(
    _.range(6),
    L.map(a => Promise.resolve(a * a)),
    L.filter(a => a % 2),
    L.map(a => a * a),
    _.take(5),
    log
);
_.go(
    _.range(6),
    L.map(a => a * a),
    L.filter(a => Promise.resolve(a % 2)),
    L.map(a => a * a),
    _.take(5),
    log
);