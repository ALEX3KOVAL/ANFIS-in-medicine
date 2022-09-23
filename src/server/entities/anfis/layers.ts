import RulesList from "../rulesList/rulesList";
import Rule from "../rulesList/rule";
import {decodingX} from "../../preparation/dataConvertation";

export let fuzzificationLayer = async (inputData: number[], mins: number[], maxs: number[]): Promise<number[]> => {
    let ruleIndex: number = 0
    let variablesCount: number = (await RulesList.instance()).variablesCount
    let rulesCount: number = (await RulesList.instance()).size
    let fuzzificatedNeuronsWeights: number[] = new Array<number>(rulesCount * variablesCount)
    let rulesList: Rule[] = (await RulesList.instance()).allRules;
    for (let rule of rulesList) {
        for (let variableIndex: number = 0; variableIndex < variablesCount; variableIndex++) {
            let vvv: number = rule.getCondition(variableIndex).term.getValue(decodingX(inputData[variableIndex], variableIndex, mins, maxs));
            fuzzificatedNeuronsWeights[variableIndex * rulesCount + ruleIndex] = vvv;
        }
        ruleIndex++
    }
    return fuzzificatedNeuronsWeights
}

export let aggregationLayer = (fuzzificatedNeuronsWeights: number[], variablesCount: number, rulesCount: number): number[] => {
    let aggregationList: number[] = new Array<number>(rulesCount);
    for (let i: number = 0; i < rulesCount; i++) {
        aggregationList[i] = 0.0;
    }
    for (let ruleIndex: number = 0; ruleIndex < rulesCount; ruleIndex++) {
        let aggregatedSubConditions: number = 1.0;
        for (let variableIndex: number = 0; variableIndex < variablesCount; variableIndex++) {
            let index: number = variableIndex * rulesCount + ruleIndex;
            let value: number = fuzzificatedNeuronsWeights[index];
            aggregatedSubConditions *= value;
        }
        aggregationList[ruleIndex] = aggregatedSubConditions;
    }
    return aggregationList
}

export let normalizationLayer = (aggregatedNeuronsWeights: number[]): number[][] => {
    let weightsSum: number = aggregatedNeuronsWeights.reduce((memo, elem, index, arr) => memo + elem)
    if (weightsSum == 0.0) {
        return [new Array<number>(aggregatedNeuronsWeights.length).map((element) => element = 0.0), [weightsSum]]
    }
    return [aggregatedNeuronsWeights.map((element) => element / weightsSum), [weightsSum]]
}

export let activationLayer = async (inputData: number[], normalizatedNeuronsWeights: number[]): Promise<number[]> => {
    let activatedNeuronsWeights: number[] = new Array<number>((await RulesList.instance()).size)
    for (let i: number = 0, length = activatedNeuronsWeights.length; i < length; i++) {
        activatedNeuronsWeights[i] = normalizatedNeuronsWeights[i] * (await RulesList.instance()).getRuleByIndex(i).conclusion.getLinearRegressionValue(inputData)
    }
    return activatedNeuronsWeights
}

export let outputLayer = (activatedNeuronsWeights: number[]): number => activatedNeuronsWeights.reduce((memo: number, element: number) => memo + element)