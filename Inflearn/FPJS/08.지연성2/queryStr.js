const _ = require('./lib/fx');
const L = require('./lib/l.fx');
const log = console.log;

// const queryStr = obj => _.go(
const queryStr = _.pipe(
    Object.entries,
    _.map(([k,v]) => `${k}=${v}`),
    _.reduce((a, b) => `${a}&${b}`)
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }))
