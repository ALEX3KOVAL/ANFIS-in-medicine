"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const rulesList_1 = __importDefault(require("../rulesList/rulesList"));
const layers_1 = require("./layers");
class Anfis {
    constructor() {
        this._forwardPass = (inputData, extraOptions = false) => __awaiter(this, void 0, void 0, function* () {
            let fuzzificatedWeights = yield (0, layers_1.fuzzificationLayer)(inputData, Anfis._minX, Anfis._maxX);
            let aggregatedWeights = (0, layers_1.aggregationLayer)(fuzzificatedWeights, Anfis._variablesCount, Anfis._rulesCount);
            let [normalizedWeights, weightsSum] = (0, layers_1.normalizationLayer)(aggregatedWeights);
            return extraOptions ? [normalizedWeights, aggregatedWeights, weightsSum] : [normalizedWeights];
        });
        this.predict = (inputData) => __awaiter(this, void 0, void 0, function* () {
            let normalizedWeights = (yield this._forwardPass(inputData))[0];
            let activatedWeights = yield (0, layers_1.activationLayer)(inputData, normalizedWeights);
            return (0, layers_1.outputLayer)(activatedWeights);
        });
    }
}
exports.default = Anfis;
_a = Anfis;
Anfis._variablesCount = 0;
Anfis._rulesCount = 0;
Anfis._minX = [];
Anfis._maxX = [];
Anfis.instance = (variablesCount, jsonConditionsFileName, jsonConclusionsFileName, minValues, maxValues) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Anfis._instance) {
        Anfis._variablesCount = variablesCount;
        Anfis._instance = new _a();
        Anfis._rulesCount = (yield rulesList_1.default.instance(jsonConditionsFileName, jsonConclusionsFileName)).size;
        Anfis._minX = minValues;
        Anfis._maxX = maxValues;
    }
    return _a._instance;
});
