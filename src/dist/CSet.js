"use strict";
class CSet {
    constructor() {
        this.items = {};
    }
    add(value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }
    delete(value) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }
    has(value) {
        return Object.prototype.hasOwnProperty.call(this.items, value);
    }
    clear() {
        this.items = {};
    }
    size() {
        return Object.keys(this.items).length;
    }
    values() {
        return Object.values(this.items);
    }
    union(two) {
        let newSet = new CSet();
        Object.assign(newSet.items, this.items, two.items);
        return newSet;
    }
    unionForEach(two) {
        const newSet = new CSet();
        this.values().forEach(value => newSet.add(value));
        two.values().forEach(value => newSet.add(value));
        return newSet;
    }
    intersection(other) {
        const newSet = new CSet();
        let valuesA = this.values();
        let valuesB = other.values();
        if (valuesA.length > valuesB.length) {
            valuesA = valuesB;
        }
        for (let item of valuesA) {
            if (other.has(item)) {
                newSet.add(item);
            }
        }
        return newSet;
    }
    difference(other) {
        const newSet = new CSet();
        let valuesA = this.values();
        for (let item of valuesA) {
            if (!other.has(item)) {
                newSet.add(item);
            }
        }
        return newSet;
    }
    isSubset(other) {
        if (this.size() > other.size())
            return false;
        const values = this.values();
        let isSubset = true;
        values.every(item => {
            if (other.has(item)) {
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}
// const set = new CSet();
// set.add(4)
// set.add(3)
// set.add(2)
// set.add(1)
// const set2 = new CSet();
// set2.add(9)
// set2.add(3)
// set2.add(1)
// set2.add(12)
//
// const uSet = set.union(set2);
// console.log(uSet.values())
// const iSet = set.intersection(set2);
// console.log(iSet)
// const dSet = set.difference(set2);
// console.log(dSet)
// const isSubSet = set.isSubset(set2);
// console.log(isSubSet)
//# sourceMappingURL=CSet.js.map