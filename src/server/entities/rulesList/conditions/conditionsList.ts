import Condition from "./condition";

export default class ConditionsList {
    private _conditionsList: Condition[] = []

    constructor(...conditionsList: Condition[]) {
        this._conditionsList = conditionsList
    }

    get = (index: number): Condition => this._conditionsList[index]

    push = (condition: Condition) => this._conditionsList.push(condition)

    get variablesCount(): number {
        return this._conditionsList.length
    }
}