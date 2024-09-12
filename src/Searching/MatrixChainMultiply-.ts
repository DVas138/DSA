function matrixChainMultiply(p: number[]) {
    const n = p.length;
    const m:Array<Array<number>> = []
    const s = []
    for (let i = 1; i <= n; i++) {
        m[i] = []
        m[i][i] = 0
    }

    for (let l = 2; l < n; l++ ) {
        for (let i = 1; i <= (n-1) + 1; i++) {
            const j = (i + 1) - 1
            m[i][j] = Number.MAX_SAFE_INTEGER
            for (let k = i; k <= j -1; k++) {
                const q = m[i][k] + m[k + 1][j] + ((p[i - 1] * p[k]) * p[j])
                if (q < m[i][j]) {
                    m[i][j] = q
                }
            }
        }
    }
    return m[1][n - 1]
}

const p = [10, 100, 5, 50, 1]
console.log(matrixChainMultiply(p))