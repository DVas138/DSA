function knapSack(capacity: number, values: number[], weights: number[], n: number) {
    const Ks:Array<Array<number>> = []
    for (let i = 0; i <= n; i++) {
        Ks[i] = []
    }
    for (let i = 0; i <= n; i++) {
        for (let ii = 0; ii <= capacity; ii++){
            if (i == 0 && ii == 0) {
                Ks[i][ii] = 0
            } else if (weights[i - 1] <= ii) {
                const a = values[i - 1] + Ks[i -1][ii - weights[i - 1]]
                const b = Ks[i-1][ii]
                Ks[i][ii] = a > b ? a : b
            } else {
                Ks[i][ii] = Ks[i-1][ii]
            }
        }
    }
    return Ks[n][capacity]
}

const values = [3,4,5]
const weights = [2,3,4]
const capacity = 5
const n = values.length
console.log(knapSack(capacity, values, weights, n))

function knapSackGreedy(capacity: number, weights: number[], values: number[]) {
    const n = values.length
    let load = 0;
    let val = 0
    for (let i = 0; i < n && load < capacity; i++) {
        if (weights[i] <=capacity - load) {
            val += values[i]
            load += weights[i]
        } else {
            const r = (capacity - load) / weights[i]
            val += r * values[i]
            load += weights[i]
        }
    }
    return val
}