"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mathjs_1 = require("mathjs");
class GaussianMembershipFunction {
    constructor(coeffs) {
        this.coeffs = [];
        this._denominator = (x) => 1 + Number((0, mathjs_1.pow)(((x - this.coeffs[0]) / this.coeffs[1]), 2 * this.coeffs[2]));
        this.getValue = (x) => 1 / this._denominator(x);
        this.coeffs = coeffs;
    }
}
exports.default = GaussianMembershipFunction;
