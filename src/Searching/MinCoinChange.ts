function minCoinChange(coins: number[], amount: number) {
    const cache :any[] = [];
    const makeChange = (value: number) => {
        if (!value) {
            return []
        }
        if (cache[value]) {
            return  cache[value]
        }
        let min:any[]  = []
        let newMin ,newAmount
        for (let i = 0; i <= coins.length; i++) {
            const coin = coins[i]
            newAmount = value - coin
            if (newAmount >= 0) {
                newMin = makeChange(newAmount)
            }
            if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
                min = [coin].concat(newMin)
                console.log('new min' + min + ' for ' + amount )
            }
        }
        return  (cache[value] = min)
    }
    return makeChange(amount)
}

function minCoinChangeGreedy(coins: number[], amount: number) {
    const change = []
    let total = 0
    for (let i = coins.length; i >= 0; i--) {
        const coin = coins[i]
        while (total + coin <= amount) {
            change.push(coin)
            total += coin
        }
    }
    return change
}

console.log(minCoinChange([1,5,10,25], 36))
console.log(minCoinChangeGreedy([1,5,10,25], 36))