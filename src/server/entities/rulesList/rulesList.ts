import GaussianMembershipFunction from "../../functions/mfs/gaussian"
import RuleParamsObject from "../parametersObjects/ruleParamsObject"
import FuzzyRulesDAO from "../../dao/controllers/fuzzyRulesDAO";
import LowMembershipFunction from "../../functions/mfs/low";
import HighMembershipFunction from "../../functions/mfs/high";
import ConditionsList from "./conditions/conditionsList";
import Condition from "./conditions/condition";
import Rule from "./rule";
import Conclusion from "./conclusion";
import IMembershipFunction from "../../functions/mfs/mfInterface";

export default class RulesList {
    private static _rulesList: Rule[] = []
    private static _ruleParamsObject: RuleParamsObject
    private static _conditionsFileName: string
    private static _conclusionsFileName: string
    private static _instance: RulesList

    private constructor(conditionsJSONFileName?: string, conclusionsJSONFileName?: string) {
        RulesList._conditionsFileName = conditionsJSONFileName!
        RulesList._conclusionsFileName = conclusionsJSONFileName!
    }

    static instance = async (conditionsJSONFileName?: string, conclusionsJSONFileName?: string): Promise<RulesList> => {
        if (!this._instance) {
            RulesList._instance = new RulesList(conditionsJSONFileName, conclusionsJSONFileName)
            RulesList._ruleParamsObject = await FuzzyRulesDAO.instance.getRuleParamsObject(conditionsJSONFileName!, conclusionsJSONFileName!);
            let map: Array<Map<number, IMembershipFunction>> = [
                new Map([
                    [0, new LowMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("myco", 0)) as IMembershipFunction],
                    [1, new HighMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("myco", 1)) as IMembershipFunction]
                ]),
                new Map([
                    [0, new LowMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("tempe", 0)) as IMembershipFunction],
                    [1, new GaussianMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("tempe", 1)) as IMembershipFunction]
                ]),
                new Map([
                    [0, new LowMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("limpho", 0)) as IMembershipFunction],
                    [1, new GaussianMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("limpho", 1)) as IMembershipFunction],
                ]),
                new Map([
                    [0, new LowMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("leuko", 0)) as IMembershipFunction],
                    [1, new GaussianMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("leuko", 1)) as IMembershipFunction],
                ])
            ]
            map[1].set(2, new HighMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("tempe",2)))
            map[2].set(2, new HighMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("limpho", 2)))
            map[3].set(2, new HighMembershipFunction(RulesList._ruleParamsObject.getConditionsValuesByKeyAndIndex("leuko", 2)))
            let conclusionIndex: number = 0
            for (let mycoIndex: number = 0, endMyco: number = RulesList._ruleParamsObject.countOfFunctionsByKey("myco"); mycoIndex < endMyco; mycoIndex++) {
                for (let tempeIndex: number = 0, endTempe: number = RulesList._ruleParamsObject.countOfFunctionsByKey("tempe"); tempeIndex < endTempe; tempeIndex++) {
                    for (let limphoIndex: number = 0, endLimpho: number = RulesList._ruleParamsObject.countOfFunctionsByKey("limpho"); limphoIndex < endLimpho; limphoIndex++) {
                        for (let leukoIndex: number = 0, endLeuko: number = RulesList._ruleParamsObject.countOfFunctionsByKey("leuko"); leukoIndex < endLeuko; leukoIndex++) {
                            RulesList._rulesList.push(
                                new Rule(
                                    new ConditionsList(
                                        new Condition(map[0].get(mycoIndex)!),
                                        new Condition(map[1].get(tempeIndex)!),
                                        new Condition(map[2].get(limphoIndex)!),
                                        new Condition(map[3].get(leukoIndex)!)),
                                    new Conclusion(RulesList._ruleParamsObject.getConclusionsParamsByIndex(conclusionIndex))))
                            conclusionIndex++
                        }
                    }
                }
            }
        }
        return this._instance
    }

    get size(): number {
        return RulesList._rulesList.length
    }

    get variablesCount(): number {
        return RulesList._rulesList[0].variablesCount
    }

    get allRules(): Rule[] {
        return RulesList._rulesList
    }

    getRuleByIndex(index: number): Rule {
        return RulesList._rulesList[index]
    }
}