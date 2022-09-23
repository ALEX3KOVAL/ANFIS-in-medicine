export default class ConditionsParamsObject {
     private _conditionsMap: Map<string, number[][]>

    constructor(conditionsMap: Map<string, number[][]>) {
         this._conditionsMap = conditionsMap
    }

    getConditionsValuesByKeyAndIndex = (key: string, index: number): number[] => this._conditionsMap.get(key)![index]

    countOfFunctionsByKey = (key: string): number => this._conditionsMap.get(key)!.length
}