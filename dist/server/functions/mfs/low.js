"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mathjs_1 = require("mathjs");
class LowMembershipFunction {
    constructor(coeffs) {
        this.coeffs = [];
        this._denominator = (x) => 1 + Number((0, mathjs_1.pow)(((x - this.coeffs[0]) / this.coeffs[1]), 2 * this.coeffs[2]));
        this.getValue = (x) => (x >= this.coeffs[0]) ? 1.0 / this._denominator(x) : 1.0;
        this.coeffs = coeffs;
    }
}
exports.default = LowMembershipFunction;
