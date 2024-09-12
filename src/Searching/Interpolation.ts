import {Compare, defaultCompare, defaultDiff, defaultEquals} from "../utils";

function biggerOrEqual(compareFN: Function = defaultCompare, a: any, b: any) {
    const compare = compareFN(a, b)
    return compare === Compare.BIGGER_THAN || compare === Compare.EQUALS
}
function lesserOrEqual(compareFN: Function = defaultCompare, a: any, b: any) {
    const compare = compareFN(a, b)
    return compare === Compare.LESS_THAN || compare === Compare.EQUALS
}

function interSearch(array: any[], value: any, compareFN: Function = defaultCompare, equalsFN: Function = defaultEquals, diffFN: Function = defaultDiff) {
    const {length} = array
    let low = 0
    let high = length - 1
    let pos = -1
    let delta = -1
    while (low <= high && biggerOrEqual(compareFN,value ,array[low]) && lesserOrEqual(compareFN, value, array[high])) {
        delta = diffFN(value, array[low]) / diffFN(array[high], array[low])
        pos = low + Math.floor((high - low) * delta)
        if (compareFN(array[pos] , value) === Compare.LESS_THAN) {
            low = pos + 1
        } else {
            high = pos - 1
        }
    }
    return false
}