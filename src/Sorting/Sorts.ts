import {Compare, defaultCompare, maxValue} from "../utils";

function swap(array: any[], a: any, b: any) {
    [array[a], array[b]] = [array[b], array[a]]
}

function bubbleSort<T>(array: T[], compareFN: Function = defaultCompare) {
    const {length} = array
    for (let i = 0; i < length; i++) {
        for (let ii = 0; ii < length - 1 - i; ii++) {
            if (compareFN(array[ii], array[ii + 1]) == Compare.BIGGER_THAN) {
                swap(array, ii, ii + 1)
            }
        }
    }
}

function selectSort<T>(array: T[], compareFN: Function = defaultCompare) {
    const {length} = array
    let minIndex = 0
    for (let i = 0; i < length - 1; i++) {
        for (let ii = i; ii < length; ii++) {
            if (compareFN(array[minIndex], array[ii]) === Compare.BIGGER_THAN) {
                minIndex = ii
            }
        }
        if (i !== minIndex) {
            swap(array, i, minIndex)
        }
    }
    return array
}

function insertSort<T>(array: T[], compareFN: Function = defaultCompare) {
    const {length} = array
    let temp: T
    for (let i = 1; i < length; i++) {
        temp = array[i];
        let ii = i;
        while (ii < i && compareFN(array[ii], array[ii - 1]) === Compare.BIGGER_THAN) {
            array[ii] = array[ii - 1]
            ii--
        }
        array[ii] = temp
    }
    return array
}

function mergeSort<T>(array: T[], compareFN: Function = defaultCompare): T[] {
    if (array.length > 1) {
        const {length} = array
        const middle = Math.floor(length / 2);
        const left = mergeSort(array.slice(0, middle), compareFN);
        const right = mergeSort(array.slice(middle, length), compareFN);
        array = merge(left, right, compareFN);
    }
    return array
}

function merge(arrayL: any[], arrayR: any[], compareFN: Function): any[] {
    let i = 0, j = 0
    const result = []
    while (i < arrayL.length && j < arrayR.length) {
        result.push(compareFN(arrayL[i], arrayR[j]) === Compare.LESS_THAN ? arrayL[i++] : arrayR[j++])
    }
    return result.concat(i < arrayL.length ? arrayL.slice(i) : arrayR.slice(j))
}

export function quickSort(array: any[], compareFN: Function = defaultCompare) {
    return quick(array, 0, array.length, compareFN)
}

function quick(array: any[], Lstart: number, Rstart: number, compareFN: Function) {
    let index: any
    if (array.length > 1) {
        index = partition(array, Lstart, Rstart, compareFN)
        if (Lstart < index - 1) {
            quick(array, Lstart, index - 1, compareFN)
        }
        if (index < Rstart) {
            quick(array, index, Rstart, compareFN)
        }
    }
    return array
}

function partition(array: any[], left: number, right: number, compareFN: Function): number {
    const pivot = array[Math.floor((left + right) / 2)];
    let l = left
    let r = right
    while (l <= r) {
        while (compareFN(array[l], pivot) === Compare.LESS_THAN) {
            l++
        }
        while (compareFN(array[r], pivot) === Compare.BIGGER_THAN) {
            r--
        }
        if (l <= r) {
            swap(array, l, r)
            l++
            r--
        }
    }
    return l
}

function countingSort(array: any[]) {
    if (array.length < 1) {
        return array
    }
    const max = maxValue(array)
    const counted: number[] = Array(max + 1);
    array.forEach(element => {
        if (!counted[element]) {
            counted[element] = 0
        } else {
            counted[element]++
        }
    })
    let sortedIndex = 0
    counted.forEach((count, index) => {
        while (count > 0) {
            array[sortedIndex++] = index
            count--
        }
    })
}

function bucketSort(array: any[], bucketSize: number = 8) {
    if (array.length < 2) {
        return array
    }
    const buckets = createBuckets(array, bucketSize);
    return sortedBuckets(buckets)
}

function createBuckets(array: any[], bucketSize: number) {
    let min = Infinity, max = 0
    for (let i of array) {
        if (i < min) {
            min = i
        } else if (max < i) {
            max = i
        }
    }

    const bucketCount = Math.floor((max - min) / bucketSize) + 1
    const buckets = []
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []
    }
    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor((array[i] - min) / bucketSize)
        //@ts-ignore
        buckets[bucketIndex].push(array[i])
    }
    return buckets
}

function sortedBuckets(buckets: any[]) {
    const sortedArray = []
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]) {
            insertSort(buckets[i])
            sortedArray.push(...buckets[i])
        }
    }
    return sortedArray
}

function radixSort(array: any[], radixBase: number = 10) {
    if (array.length < 2) {
        return array
    }
    let min = Infinity, max = 0
    for (let i of array) {
        if (i < min) {
            min = i
        } else if (max < i) {
            max = i
        }
    }
    let significantNumber = 1
    while ((max - min) / significantNumber >= 1) {
        array = countingSortForRadix(array, radixBase, significantNumber, min)
        significantNumber *= radixBase
    }
    return array
}

function countingSortForRadix(array: any[], Base: number, significant: number, min: number) {
    let bucketIndex
    const buckets = []
    const aux = []
    for (let i = 0; i < Base; i++) {
        buckets[i] = 0
    }
    for (let i = 0; i < array.length; i++) {
        bucketIndex = Math.floor(((array[i] - min) / significant) % Base)
        buckets[bucketIndex]++
    }
    for (let i = 0; i < Base; i++) {
        buckets[i] += buckets[i - 1]
    }
    for (let i = array.length - 1; i >= 0; i--) {
        bucketIndex = Math.floor(((array[i] - min) / significant) % Base)
        aux[--buckets[bucketIndex]] = array[i]
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = aux[i]
    }
    return array
}

function initializeUnSorted(size: number) {
    const array = []
    for (let i = 0; i < size; i++) {
        array.push(size - i)
    }
    return array
}

const testArr = initializeUnSorted(6);
console.log(testArr)
// bubbleSort(testArr)
// console.log(testArr)
console.log(selectSort(testArr))
console.log(insertSort(testArr))
console.log(mergeSort(testArr))
console.log(bucketSort(testArr))