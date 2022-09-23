"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConditionsList {
    constructor(...conditionsList) {
        this._conditionsList = [];
        this.get = (index) => this._conditionsList[index];
        this.push = (condition) => this._conditionsList.push(condition);
        this._conditionsList = conditionsList;
    }
    get variablesCount() {
        return this._conditionsList.length;
    }
}
exports.default = ConditionsList;
