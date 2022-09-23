import ConditionsList from "./conditions/conditionsList";
import Condition from "./conditions/condition";
import Conclusion from "./conclusion";

export default class Rule {
    private _conditionsList: ConditionsList
    private _conclusion: Conclusion

    constructor(conditionsList: ConditionsList, conclusion: Conclusion) {
        this._conditionsList = conditionsList
        this._conclusion = conclusion
    }

    getCondition = (index: number): Condition => this._conditionsList.get(index)

    get conclusion(): Conclusion {
        return this._conclusion
    }

    get variablesCount(): number {
        return this._conditionsList.variablesCount
    }
}