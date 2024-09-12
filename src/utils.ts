export function defaultEquals(a: any, b: any){
    return a === b;
}

export enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0
}

export enum BalanceFactor{
    UNBALANCED_RIGHT = 1,
    SLIGHTLY_UNBALANCED_RIGHT = 2,
    BALANCED = 3,
    SLIGHTLY_UNBALANCED_LEFT = 4,
    UNBALANCED_LEFT = 5
}

export enum Colors {
    RED = 0,
    BLACK = 1
}
export function defaultCompare<T>(a: T, b: T): number {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function reverseCompare<T>(compare:Function){
    return (a: T, b: T) => compare(b , a)
}
export function defaultToString(item: any){
    if(item === null){
        return "null"
    } else if(item === undefined){
        return "undefined"
    } else if(typeof item === 'string' || item instanceof String){
        return `${item}`
    }
    return item.toString();
}

export function swap<T>(arr: T[], a:number, b:number ){
    let tempElement = arr[a];
    arr[a] = arr[b]
    arr[b] = tempElement
}

export function maxValue(array: any) {
    let max = array[0]
    for (let i of array) {
        if (i > max) {
            max = i
        }
    }
    return max
}
export function defaultDiff<T>(a: T, b: T): number {
    return Number(a) - Number(b);
}