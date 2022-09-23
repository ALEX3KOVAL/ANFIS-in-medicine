"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linearRegression_1 = __importDefault(require("../linearRegression"));
class Conclusion {
    constructor(coeffs) {
        this.getLinearRegressionValue = (variablesWeights) => this._linearRegression.predict(variablesWeights);
        this.getLinearRegressionCoefByIndex = (index) => this._linearRegression.getCoefByIndex(index);
        this.setLinearRegressionCoeffByIndex = (index, value) => this._linearRegression.setValueByIndex(index, value);
        this._linearRegression = new linearRegression_1.default(coeffs);
    }
    get linearRegressionCoeffsCount() {
        return this._linearRegression.coeffsCount;
    }
}
exports.default = Conclusion;
