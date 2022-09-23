"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor(conditionsList, conclusion) {
        this.getCondition = (index) => this._conditionsList.get(index);
        this._conditionsList = conditionsList;
        this._conclusion = conclusion;
    }
    get conclusion() {
        return this._conclusion;
    }
    get variablesCount() {
        return this._conditionsList.variablesCount;
    }
}
exports.default = Rule;
