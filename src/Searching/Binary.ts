import {Compare, defaultCompare} from "../utils";
import {quickSort} from "../Sorting/Sorts";

function lesserOrEqual(a:any, b:any, compareFN: Function = defaultCompare) {
    const comp = compareFN(a, b)
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}
function bSearch(array: any[], value: any, compareFN: Function = defaultCompare) {
    const sortedArray = quickSort(array)
    let low = 0 , high = array.length - 1
    while (lesserOrEqual(low, high, compareFN)) {
        const mid = Math.floor((low + high) / 2);
        const element = sortedArray[mid]
        if (compareFN(element, value) === Compare.LESS_THAN) {
            low = mid - 1
        } else if (compareFN(element, value) === Compare.BIGGER_THAN) {
            high = mid + 1
        } else {
            return mid
        }
    }
    return false
}

function binaryRecurcive(array: any[], value: any, low: number, high: number, compareFN: Function = defaultCompare) {
    if (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const element = array[mid]
        if (compareFN(value, element) == Compare.LESS_THAN) {
          return   binaryRecurcive(array, value, low, mid - 1, compareFN)
        } else if (compareFN(value, element) === Compare.BIGGER_THAN) {
            return   binaryRecurcive(array, value, mid + 1, high, compareFN)
        } else {
            return mid
        }
    }
    return false
}

function binarySearchR(array: any[], value: any, compareFN: Function = defaultCompare) {
    const sortedArray = quickSort(array)
    const low = 0;
    const  high = sortedArray.length - 1
    return binaryRecurcive(sortedArray, value, low, high ,compareFN)
}