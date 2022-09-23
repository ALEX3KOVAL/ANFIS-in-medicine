export default class LinearRegression {
    private _weights: number[] = []

    constructor(weights: number[]) {
        this._weights = weights
    }

    setValueByIndex = (index: number, value: number) => this._weights[index] = value

    getCoefByIndex = (index: number): number => this._weights[index]

    predict = (variablesWeights: number[]): number => {
        let result: number = this._weights[0]
        for (let i: number = 1, length: number = this._weights.length; i < length; i++) {
            result += this._weights[i] * variablesWeights[i - 1]
        }
        return result
    }

    get coeffsCount(): number {
        return this._weights.length
    }
}