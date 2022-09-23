import RulesList from "../rulesList/rulesList";
import {fuzzificationLayer, aggregationLayer,
    normalizationLayer, activationLayer, outputLayer } from "./layers"

export default class Anfis {
    private static _variablesCount : number = 0
    private static _rulesCount : number = 0
    private static _minX: number[] = []
    private static _maxX: number[] = []
    private static _instance: Anfis;

    private constructor() { }

    static instance = async (variablesCount?: number,
                      jsonConditionsFileName?: string,
                      jsonConclusionsFileName?: string,
                      minValues?: number[],
                      maxValues?: number[]): Promise<Anfis> => {
        if (!Anfis._instance) {
            Anfis._variablesCount = variablesCount!;
            Anfis._instance = new this();
            Anfis._rulesCount = (await RulesList.instance(jsonConditionsFileName, jsonConclusionsFileName)).size;
            Anfis._minX = minValues!;
            Anfis._maxX = maxValues!;
        }
        return this._instance;
}

    private _forwardPass = async (inputData: number[], extraOptions = false) : Promise<number[][]> => {
        let fuzzificatedWeights: number[] = await fuzzificationLayer(inputData, Anfis._minX, Anfis._maxX);
        let aggregatedWeights: number[] = aggregationLayer(fuzzificatedWeights, Anfis._variablesCount, Anfis._rulesCount)
        let [normalizedWeights, weightsSum] = normalizationLayer(aggregatedWeights)
        return extraOptions ? [normalizedWeights, aggregatedWeights, weightsSum] : [normalizedWeights]
    }

    predict = async (inputData: number[]): Promise<number> => {
        let normalizedWeights: number[] = (await this._forwardPass(inputData))[0]
        let activatedWeights: number[] = await activationLayer(inputData, normalizedWeights)
        return outputLayer(activatedWeights)
    }
}