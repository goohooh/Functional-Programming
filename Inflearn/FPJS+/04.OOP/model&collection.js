const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');

class Model {
    constructor(attrs = {}) {
        this._attrs = attrs;
    }
    get(k) {
        return this._attrs[k];
    }
    set(k, v) {
        this._attrs[k] = v;
        return this;
    }
    toJSON() {
        // for () {
        //     if () {}
        // }
        // return; -> 이부분에 결국 FP를 적용할 수 있다.
    }
}
class Collection {
    constructor(models = []) {
        this._models = models;
    }
    at(idx) {
        return this._models[idx];
    }
    add(model) {
        this._models.push(model);
        return this;
    }
    *[Symbol.iterator]() {
        // for (const model of this._models) {
        //     yield model;
        // }
        yield *this._models;
    }
    // [Symbol.iterator]() {
    //     return this._models[Symbol.iterator]();
    // }
}

const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 3, name: 'BB' }));
coll.add(new Model({ id: 5, name: 'CC' }));
console.log(coll.at(2).get('name'));
console.log(coll.at(1).get('id'));

_.go(
    L.range(3),
    L.map(i => coll.at(i)),
    L.map(i => i.get('name')),
    _.each(console.log),
)
_.go(
    coll,
    L.map(i => i.get('name')),
    _.each(console.log),
)
_.go(
    coll,
    _.each(m => m.set('name', m.get('name').toLowerCase())),
)
console.log([...coll])