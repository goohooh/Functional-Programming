const map = (f, iter) => {
    const res = [];
    for (const i of iter) res.push(f(i));
    return res;
}
const filter = (f, iter) => {
    let res = [];
    for (const i of iter) {
        if (f(i)) res.push(i);
    }
    return res;
}
const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const i of iter) acc = f(acc, i);
    return acc;
};

module.exports = {
    map,
    filter,
    reduce,
}