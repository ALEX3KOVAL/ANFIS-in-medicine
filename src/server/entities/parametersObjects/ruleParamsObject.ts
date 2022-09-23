import ConditionsParamsObject from "./conditionsParamsObject";

export default class RuleParamsObject {
    private _conditionsParamsObject: ConditionsParamsObject
    private _conclusionsParams: number[][]

    constructor(conditionsParamsObject: ConditionsParamsObject, conclusionsParams: number[][]) {
        this._conditionsParamsObject = conditionsParamsObject
        this._conclusionsParams = conclusionsParams
    }

    get conditionsParamsObject(): ConditionsParamsObject {return this._conditionsParamsObject}

    getConditionsValuesByKeyAndIndex = (key: string, index: number): number[] => this._conditionsParamsObject.getConditionsValuesByKeyAndIndex(key, index)

    getConclusionsParamsByIndex = (index: number): number[] => this._conclusionsParams[index]

    countOfFunctionsByKey = (key: string): number => this._conditionsParamsObject.countOfFunctionsByKey(key)
}