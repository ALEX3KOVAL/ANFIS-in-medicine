"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinearRegression {
    constructor(weights) {
        this._weights = [];
        this.setValueByIndex = (index, value) => this._weights[index] = value;
        this.getCoefByIndex = (index) => this._weights[index];
        this.predict = (variablesWeights) => {
            let result = this._weights[0];
            for (let i = 1, length = this._weights.length; i < length; i++) {
                result += this._weights[i] * variablesWeights[i - 1];
            }
            return result;
        };
        this._weights = weights;
    }
    get coeffsCount() {
        return this._weights.length;
    }
}
exports.default = LinearRegression;
