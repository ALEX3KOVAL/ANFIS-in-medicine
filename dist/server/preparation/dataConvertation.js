"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodingX = void 0;
const mathjs_1 = require("mathjs");
let decodingX = (x, variableIndex, mins, maxs) => {
    let value = ((x * (maxs[variableIndex] - mins[variableIndex])) + mins[variableIndex]);
    if (variableIndex == 0) {
        return (0, mathjs_1.round)(value);
    }
    return value;
};
exports.decodingX = decodingX;
