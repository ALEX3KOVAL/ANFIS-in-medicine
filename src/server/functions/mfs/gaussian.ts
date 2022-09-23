import {pow, log} from "mathjs"
import MembershipFunctionI from "./mfInterface";

export default class GaussianMembershipFunction implements MembershipFunctionI {
    private coeffs: number[] = []

    constructor(coeffs: number[]) {
        this.coeffs = coeffs
    }

    private _denominator = (x: number): number => 1 + Number(pow(((x - this.coeffs[0]) / this.coeffs[1]), 2 * this.coeffs[2]))

    getValue = (x: number): number => 1 / this._denominator(x)
}