import {defaultEquals} from "../utils";

function lSearch(array: any[], value: any, equalsFN: Function = defaultEquals) {
    for (let i of array) {
        if (equalsFN(i, value)) {
            return i
        }
    }
    return false
}