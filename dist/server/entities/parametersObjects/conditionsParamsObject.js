"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConditionsParamsObject {
    constructor(conditionsMap) {
        this.getConditionsValuesByKeyAndIndex = (key, index) => this._conditionsMap.get(key)[index];
        this.countOfFunctionsByKey = (key) => this._conditionsMap.get(key).length;
        this._conditionsMap = conditionsMap;
    }
}
exports.default = ConditionsParamsObject;
