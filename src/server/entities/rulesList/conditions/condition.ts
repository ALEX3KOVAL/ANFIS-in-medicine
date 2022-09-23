import Statement from "../statement";
import IMembershipFunction from "../../../functions/mfs/mfInterface";

export default class Condition extends Statement {
    constructor(term: IMembershipFunction) {
        super(term)
    }
}