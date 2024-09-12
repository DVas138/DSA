function lcs(wordA: string, wordB: string) {
    const m = wordA.length
    const n = wordB.length
    const l: Array<Array<number>> = []
    for (let i = 0; i <= m; i++) {
        l[i] = []
        for (let ii = 0; ii <= n; ii++) {
            l[i][ii] = 0
        }
    }

    for (let i = 0; i <= m; i++) {
        for (let ii = 0; ii <= n; ii++) {
            if (i === 0 || ii === 0) {
                l[i][ii] = 0
            } else if (wordA[i - 1] === wordB[ ii - 1]) {
                l[i][ii] = l[i - 1][ii - 1] + 1
            } else {
                const a = l[i - 1][ii]
                const b = l[i][ii - 1]
                l[i][ii] = a > b ? a : b
            }
        }
    }
    return l[m][n]
}

const wordA = 'acdaed'
const wordB = 'abcadf'
console.log(lcs(wordA, wordB))