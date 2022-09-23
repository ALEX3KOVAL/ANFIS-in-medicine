import IMembershipFunction from "../../functions/mfs/mfInterface";
export default abstract class Statement {
    private _term: IMembershipFunction

    constructor(term: IMembershipFunction) {
        this._term = term
    }

    get term(): IMembershipFunction {
        return this._term
    }
}