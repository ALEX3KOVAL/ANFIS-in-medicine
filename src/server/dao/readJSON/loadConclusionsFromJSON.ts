import {readFile} from "fs/promises";
import {resolve} from "path"
import ConditionsParamsObject from "../../entities/parametersObjects/conditionsParamsObject";

export let getConclusions = async (jsonFileName: string): Promise<number[][]> => {
    let data: Buffer = await readFile(resolve(__dirname, `./../../../../assets/${jsonFileName}`))
    return JSON.parse('' + data)
}