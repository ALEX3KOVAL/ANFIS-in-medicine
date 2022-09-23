import {pow, log} from "mathjs"
import IMembershipFunction from "./mfInterface";

export default class LowMembershipFunction implements IMembershipFunction {
    private coeffs: number[] = []

    constructor(coeffs: number[]) {
        this.coeffs = coeffs
    }

    private _denominator = (x: number): number => 1 + Number(pow(((x - this.coeffs[0]) / this.coeffs[1]), 2 * this.coeffs[2]))

    getValue = (x: number): number => (x >= this.coeffs[0]) ? 1.0 / this._denominator(x) : 1.0
}