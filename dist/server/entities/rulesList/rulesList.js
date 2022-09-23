"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const gaussian_1 = __importDefault(require("../../functions/mfs/gaussian"));
const fuzzyRulesDAO_1 = __importDefault(require("../../dao/controllers/fuzzyRulesDAO"));
const low_1 = __importDefault(require("../../functions/mfs/low"));
const high_1 = __importDefault(require("../../functions/mfs/high"));
const conditionsList_1 = __importDefault(require("./conditions/conditionsList"));
const condition_1 = __importDefault(require("./conditions/condition"));
const rule_1 = __importDefault(require("./rule"));
const conclusion_1 = __importDefault(require("./conclusion"));
class RulesList {
    constructor(conditionsJSONFileName, conclusionsJSONFileName) {
        RulesList._conditionsFileName = conditionsJSONFileName;
        RulesList._conclusionsFileName = conclusionsJSONFileName;
    }
    get size() {
        return RulesList._rulesList.length;
    }
    get variablesCount() {
        return RulesList._rulesList[0].variablesCount;
    }
    get allRules() {
        return RulesList._rulesList;
    }
    getRuleByIndex(index) {
        return RulesList._rulesList[index];
    }
}
exports.default = RulesList;
_a = RulesList;
RulesList._rulesList = [];
RulesList.instance = (conditionsJSONFileName, conclusionsJSONFileName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_a._instance) {
        RulesList._instance = new RulesList(conditionsJSONFileName, conclusionsJSONFileName);
        RulesList._ruleParamsObject = yield fuzzyRulesDAO_1.default.instance.getRuleParamsObject(conditionsJSONFileName, conclusionsJSONFileName);
        let map = [
            new Map([
                [0, new low_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("myco", 0))],
                [1, new high_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("myco", 1))]
            ]),
            new Map([
                [0, new low_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("tempe", 0))],
                [1, new gaussian_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("tempe", 1))]
            ]),
            new Map([
                [0, new low_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("limpho", 0))],
                [1, new gaussian_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("limpho", 1))],
            ]),
            new Map([
                [0, new low_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("leuko", 0))],
                [1, new gaussian_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("leuko", 1))],
            ])
        ];
        map[1].set(2, new high_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("tempe", 2)));
        map[2].set(2, new high_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("limpho", 2)));
        map[3].set(2, new high_1.default(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("leuko", 2)));
        let conclusionIndex = 0;
        for (let mycoIndex = 0, endMyco = RulesList._ruleParamsObject.countOfFunctionsByKey("myco"); mycoIndex < endMyco; mycoIndex++) {
            for (let tempeIndex = 0, endTempe = RulesList._ruleParamsObject.countOfFunctionsByKey("tempe"); tempeIndex < endTempe; tempeIndex++) {
                for (let limphoIndex = 0, endLimpho = RulesList._ruleParamsObject.countOfFunctionsByKey("limpho"); limphoIndex < endLimpho; limphoIndex++) {
                    for (let leukoIndex = 0, endLeuko = RulesList._ruleParamsObject.countOfFunctionsByKey("leuko"); leukoIndex < endLeuko; leukoIndex++) {
                        RulesList._rulesList.push(new rule_1.default(new conditionsList_1.default(new condition_1.default(map[0].get(mycoIndex)), new condition_1.default(map[1].get(tempeIndex)), new condition_1.default(map[2].get(limphoIndex)), new condition_1.default(map[3].get(leukoIndex))), new conclusion_1.default(RulesList._ruleParamsObject.getConclusionsParamsByIndex(conclusionIndex))));
                        conclusionIndex++;
                    }
                }
            }
        }
    }
    return _a._instance;
});
