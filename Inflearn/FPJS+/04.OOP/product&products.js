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
    toJSON() {}
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
        yield *this._models;
    }
}

class Product extends Model {

}

class Products extends Collection {
    getPrices() {
        return _.map(p => p.get('price'), this);
    }
    totalPrice() {
        return _.go(
            this, // Symbol.iterator가 있으므로
            _.map(a => a.get('price')),
            _.reduce((a, b) => a + b)
        )
    }
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 3, price: 25000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 5, price: 35000 }));
console.log(products.totalPrice());

console.log(products.getPrices());