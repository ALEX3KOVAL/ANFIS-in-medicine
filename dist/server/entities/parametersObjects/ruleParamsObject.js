"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RuleParamsObject {
    constructor(conditionsParamsObject, conclusionsParams) {
        this.getConditionsValuesByKeyAndIndex = (key, index) => this._conditionsParamsObject.getConditionsValuesByKeyAndIndex(key, index);
        this.getConclusionsParamsByIndex = (index) => this._conclusionsParams[index];
        this.countOfFunctionsByKey = (key) => this._conditionsParamsObject.countOfFunctionsByKey(key);
        this._conditionsParamsObject = conditionsParamsObject;
        this._conclusionsParams = conclusionsParams;
    }
    get conditionsParamsObject() { return this._conditionsParamsObject; }
}
exports.default = RuleParamsObject;
