import '../../entities/parametersObjects/conditionsParamsObject'
import ConditionsParamsObject from "../../entities/parametersObjects/conditionsParamsObject";
import RuleParamsObject from "../../entities/parametersObjects/ruleParamsObject"
import {getConditions} from "../readJSON/loadConditionsFromJSON";
import {getConclusions} from "../readJSON/loadConclusionsFromJSON";

export default class FuzzyRulesDAO {
    private static _instance: FuzzyRulesDAO
    private static conditionsMap: Map<string, ConditionsParamsObject> = new Map<string, ConditionsParamsObject>()
    private static conclusionsMap: Map<string, number[][]> = new Map<string, number[][]>()

    private constructor() { }

    static get instance(): FuzzyRulesDAO {
        if (!this._instance) {
            FuzzyRulesDAO._instance = new FuzzyRulesDAO()
        }
        return this._instance
    }

    private _readConditionsFromJSON = async (conditionsJSONFileName: string): Promise<ConditionsParamsObject> => {
        if (!(conditionsJSONFileName in FuzzyRulesDAO.conditionsMap)) {
            let conditions: ConditionsParamsObject = await getConditions(conditionsJSONFileName)
            FuzzyRulesDAO.conditionsMap.set(conditionsJSONFileName, conditions)
        }
        return FuzzyRulesDAO.conditionsMap.get(conditionsJSONFileName)!
    }

    private _readConclusionsFromJSON = async (conclusionsJSONFileName: string): Promise<number[][]> => {
        if (!(conclusionsJSONFileName in FuzzyRulesDAO.conclusionsMap)) {
            let conclusions: number[][] = await getConclusions(conclusionsJSONFileName)
            FuzzyRulesDAO.conclusionsMap.set(conclusionsJSONFileName, conclusions)
        }
        return FuzzyRulesDAO.conclusionsMap.get(conclusionsJSONFileName)!
    }

    getRuleParamsObject = async (conditionsJSONFileName: string, conclusionsJSONFileName: string): Promise<RuleParamsObject> => {
        let conditionsParamsObject: ConditionsParamsObject = await this._readConditionsFromJSON(conditionsJSONFileName)
        let conclusionsParams: number[][] = await this._readConclusionsFromJSON(conclusionsJSONFileName)
        return new RuleParamsObject(conditionsParamsObject, conclusionsParams)
    }
}