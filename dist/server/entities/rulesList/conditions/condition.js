"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statement_1 = __importDefault(require("../statement"));
class Condition extends statement_1.default {
    constructor(term) {
        super(term);
    }
}
exports.default = Condition;
