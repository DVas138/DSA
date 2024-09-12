"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class MinHeap {
    constructor(compareFn = utils_1.defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }
    // left child : 2 * index + 1
    // right child : 2 * index + 2
    // parent : ( index -1 ) / 2
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    getRightIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        else {
            return Math.floor((index - 1) / 2);
        }
    }
    insert(key) {
        if (key) {
            this.heap.push(key);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        else {
            return false;
        }
    }
    siftUp(index) {
        let parentIndex = this.getParentIndex(index);
        if (parentIndex) {
            while (index > 0 && this.compareFn(this.heap[parentIndex], this.heap[index]) === utils_1.Compare.BIGGER_THAN) {
                (0, utils_1.swap)(this.heap, index, parentIndex);
                index = parentIndex;
                parentIndex = this.getParentIndex(index);
            }
        }
    }
}
const heap = new MinHeap();
heap.insert(3);
//# sourceMappingURL=Heap.js.map