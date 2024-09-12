import {Compare, defaultCompare, swap, reverseCompare} from "./utils"

class MinHeap<T> {
    heap: T[] = []

    constructor(protected compareFn: Function = defaultCompare) {
    }

// left child : 2 * index + 1
// right child : 2 * index + 2
// parent : ( index -1 ) / 2

    getLeftIndex(index: number) {
        return 2 * index + 1
    }

    getRightIndex(index: number) {
        return 2 * index + 2
    }

    getParentIndex(index: number):number | undefined {
        if (index === 0) {
            return undefined
        } else {
            return Math.floor((index - 1) / 2)
        }

    }

    insert(key: T) {
        if (key) {
            this.heap.push(key)
            this.siftUp(this.heap.length - 1)
            return true
        } else {
            return false
        }
    }

    siftUp(index: number) {
        let parentIndex = this.getParentIndex(index)
        if (parentIndex) {
            while (index > 0 && this.compareFn(this.heap[parentIndex], this.heap[index]) === Compare.BIGGER_THAN) {
                swap(this.heap, index, parentIndex);
                index = parentIndex;
                parentIndex = this.getParentIndex(index) as number;
            }
        }
    }

    shiftDown(index: number){
        let element = index;
        const left = this.getLeftIndex(element);
        const right = this.getRightIndex(element)
        const size = this.size()
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) == Compare.BIGGER_THAN ) {
            // if (this.compareFn(this.heap[left], this.heap[right]) == Compare.LESS_THAN)
                element = left
        }
        if (right < size && this.compareFn(this.heap[element], this.heap[right]) == Compare.BIGGER_THAN ){
            // if (this.compareFn(this.heap[right], this.heap[left]) == Compare.LESS_THAN)
                element = right
        }
        if (element != index) {
            swap(this.heap, index , element)
            this.shiftDown(element)
        }
    }
    isEmpty(){
        return this.heap.length === 0
    }
    getMin(){
        if (! this.isEmpty()){
            return this.heap[0]
        }
        return undefined
    }

    size = () => this.heap.length

    extract(): T | undefined { 
        if (this.isEmpty()) {
            return undefined
        }
        if (this.heap.length === 1) {
            return this.heap.shift()
        }
        const extracted = this.heap[0]
        this.heap[0] = this.heap.pop() as T
        this.shiftDown(0)
        return extracted
    }

}
function heapify(array: any[], index: number, heapSize: number, compareFn: Function) {
    let largest = index;
    const left = (2 * index) + 1;
    const right = (2 * index) + 2;

    if (left < heapSize && compareFn(array[left], array[index]) > 0) {
        largest = left;
    }

    if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
        largest = right;
    }

    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, heapSize, compareFn);
    }
}

function heapSort(array: any[], compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn)
    while (heapSize > 1) { //for the whole array
        swap(array, 0, --heapSize) // moves the largest to the back
        heapify( array, 0, heapSize, compareFn) // rearrange heap to get largest to the front
    }
}

function buildMaxHeap(array: any[], compareFn: Function){
    for (let i = Math.floor(array.length / 2) - 1 /* parents index of last element*/; i >= 0 ; i--){
        heapify(array, i , array.length, compareFn)
    }
    return array
}

const heap = new MinHeap<number>();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(1);
console.log("** Size Empty Min **")
console.log(heap.size())
console.log(heap.isEmpty())
console.log(heap.getMin())
console.log("** Extract **")
console.log(heap.extract())
console.log(heap.getMin())

class MaxHeap<T> extends MinHeap<T> {
    constructor( protected compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn);
    }
}

// const maxHeap = new MaxHeap<number>()
// maxHeap.insert(2)
// maxHeap.insert(3)
// maxHeap.insert(4)
// maxHeap.insert(5)
// maxHeap.insert(1)
//
// console.log("** Size Max **")
// console.log(maxHeap.size())
// console.log(maxHeap.getMin())

