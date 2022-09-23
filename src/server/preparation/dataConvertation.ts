import {round} from "mathjs"

export let decodingX = (x: number, variableIndex: number, mins: number[], maxs: number[]) => {
    let value: number = ((x * (maxs[variableIndex] - mins[variableIndex])) + mins[variableIndex])
    if (variableIndex == 0) {
        return round(value)
    }
    return value
}