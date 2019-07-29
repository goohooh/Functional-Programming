const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const log = console.log;

const takeAll = _.take(Infinity);

const map = _.curry(_.pipe(
    L.map,
    takeAll,
));

const filter = _.curry(_.pipe(
    L.filter,
    takeAll,
));

// log(map(a => a + 10, L.range(4)));
log(filter(a => a % 2, L.range(4)));