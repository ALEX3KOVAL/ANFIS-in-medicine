import ConditionsParamsObject from "../../entities/parametersObjects/conditionsParamsObject";
import {readFile} from "fs/promises";
import {resolve} from "path"
import IConditions from "./IConditions";

export let getConditions = async (jsonFileName: string): Promise<ConditionsParamsObject> => {
    let conditionsMap: Map<string, number[][]> = new Map<string, number[][]>();
    let data: Buffer = await readFile(resolve(__dirname, `./../../../../assets/${jsonFileName}`));
    let condObj: IConditions = JSON.parse('' + data)
    conditionsMap.set("limpho", condObj.limpho)
    conditionsMap.set("myco", condObj.myco)
    conditionsMap.set("leuko", condObj.leuko)
    conditionsMap.set("tempe", condObj.tempe)
    return new ConditionsParamsObject(conditionsMap)
}