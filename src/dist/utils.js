"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = exports.BalanceFactor = exports.Compare = void 0;
exports.defaultEquals = defaultEquals;
exports.defaultCompare = defaultCompare;
exports.defaultToString = defaultToString;
exports.swap = swap;
function defaultEquals(a, b) {
    return a === b;
}
var Compare;
(function (Compare) {
    Compare[Compare["LESS_THAN"] = -1] = "LESS_THAN";
    Compare[Compare["BIGGER_THAN"] = 1] = "BIGGER_THAN";
    Compare[Compare["EQUALS"] = 0] = "EQUALS";
})(Compare || (exports.Compare = Compare = {}));
var BalanceFactor;
(function (BalanceFactor) {
    BalanceFactor[BalanceFactor["UNBALANCED_RIGHT"] = 1] = "UNBALANCED_RIGHT";
    BalanceFactor[BalanceFactor["SLIGHTLY_UNBALANCED_RIGHT"] = 2] = "SLIGHTLY_UNBALANCED_RIGHT";
    BalanceFactor[BalanceFactor["BALANCED"] = 3] = "BALANCED";
    BalanceFactor[BalanceFactor["SLIGHTLY_UNBALANCED_LEFT"] = 4] = "SLIGHTLY_UNBALANCED_LEFT";
    BalanceFactor[BalanceFactor["UNBALANCED_LEFT"] = 5] = "UNBALANCED_LEFT";
})(BalanceFactor || (exports.BalanceFactor = BalanceFactor = {}));
var Colors;
(function (Colors) {
    Colors[Colors["RED"] = 0] = "RED";
    Colors[Colors["BLACK"] = 1] = "BLACK";
})(Colors || (exports.Colors = Colors = {}));
function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
function defaultToString(item) {
    if (item === null) {
        return "null";
    }
    else if (item === undefined) {
        return "undefined";
    }
    else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}
function swap(arr, a, b) {
    let tempElement = arr[a];
    arr[a] = arr[b];
    arr[b] = tempElement;
}
//# sourceMappingURL=utils.js.map