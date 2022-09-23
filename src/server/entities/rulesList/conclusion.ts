import LinearRegression from "../linearRegression";

export default class Conclusion {
    private _linearRegression: LinearRegression

    constructor(coeffs: number[]) {
        this._linearRegression = new LinearRegression(coeffs)
    }

    getLinearRegressionValue = (variablesWeights: number[]) => this._linearRegression.predict(variablesWeights)

    getLinearRegressionCoefByIndex = (index: number) => this._linearRegression.getCoefByIndex(index)

    setLinearRegressionCoeffByIndex = (index: number, value: number) => this._linearRegression.setValueByIndex(index, value)

    get linearRegressionCoeffsCount(): number {
        return this._linearRegression.coeffsCount
    }
}