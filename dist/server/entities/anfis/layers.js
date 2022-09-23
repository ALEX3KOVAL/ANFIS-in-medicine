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
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputLayer = exports.activationLayer = exports.normalizationLayer = exports.aggregationLayer = exports.fuzzificationLayer = void 0;
const rulesList_1 = __importDefault(require("../rulesList/rulesList"));
const dataConvertation_1 = require("../../preparation/dataConvertation");
let fuzzificationLayer = (inputData, mins, maxs) => __awaiter(void 0, void 0, void 0, function* () {
    let ruleIndex = 0;
    let variablesCount = (yield rulesList_1.default.instance()).variablesCount;
    let rulesCount = (yield rulesList_1.default.instance()).size;
    let fuzzificatedNeuronsWeights = new Array(rulesCount * variablesCount);
    let rulesList = (yield rulesList_1.default.instance()).allRules;
    for (let rule of rulesList) {
        for (let variableIndex = 0; variableIndex < variablesCount; variableIndex++) {
            let vvv = rule.getCondition(variableIndex).term.getValue((0, dataConvertation_1.decodingX)(inputData[variableIndex], variableIndex, mins, maxs));
            fuzzificatedNeuronsWeights[variableIndex * rulesCount + ruleIndex] = vvv;
        }
        ruleIndex++;
    }
    return fuzzificatedNeuronsWeights;
});
exports.fuzzificationLayer = fuzzificationLayer;
let aggregationLayer = (fuzzificatedNeuronsWeights, variablesCount, rulesCount) => {
    let aggregationList = new Array(rulesCount);
    for (let i = 0; i < rulesCount; i++) {
        aggregationList[i] = 0.0;
    }
    for (let ruleIndex = 0; ruleIndex < rulesCount; ruleIndex++) {
        let aggregatedSubConditions = 1.0;
        for (let variableIndex = 0; variableIndex < variablesCount; variableIndex++) {
            let index = variableIndex * rulesCount + ruleIndex;
            let value = fuzzificatedNeuronsWeights[index];
            aggregatedSubConditions *= value;
        }
        aggregationList[ruleIndex] = aggregatedSubConditions;
    }
    return aggregationList;
};
exports.aggregationLayer = aggregationLayer;
let normalizationLayer = (aggregatedNeuronsWeights) => {
    let weightsSum = aggregatedNeuronsWeights.reduce((memo, elem, index, arr) => memo + elem);
    if (weightsSum == 0.0) {
        return [new Array(aggregatedNeuronsWeights.length).map((element) => element = 0.0), [weightsSum]];
    }
    return [aggregatedNeuronsWeights.map((element) => element / weightsSum), [weightsSum]];
};
exports.normalizationLayer = normalizationLayer;
let activationLayer = (inputData, normalizatedNeuronsWeights) => __awaiter(void 0, void 0, void 0, function* () {
    let activatedNeuronsWeights = new Array((yield rulesList_1.default.instance()).size);
    for (let i = 0, length = activatedNeuronsWeights.length; i < length; i++) {
        activatedNeuronsWeights[i] = normalizatedNeuronsWeights[i] * (yield rulesList_1.default.instance()).getRuleByIndex(i).conclusion.getLinearRegressionValue(inputData);
    }
    return activatedNeuronsWeights;
});
exports.activationLayer = activationLayer;
let outputLayer = (activatedNeuronsWeights) => activatedNeuronsWeights.reduce((memo, element) => memo + element);
exports.outputLayer = outputLayer;
