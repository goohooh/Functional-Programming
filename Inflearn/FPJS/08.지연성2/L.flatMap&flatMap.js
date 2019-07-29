const _ = require('./lib/fx');
const L = _.L;
const log = console.log;

const LflatMap = _.curry(_.pipe(L.map, L.flatten));
const flatMap = _.curry(_.pipe(L.map, L.flatten));

const arr = [[1,2], [3,4], [5,6,7]];
const it = LflatMap(_.map(a => a * a), arr);
log([...it]);