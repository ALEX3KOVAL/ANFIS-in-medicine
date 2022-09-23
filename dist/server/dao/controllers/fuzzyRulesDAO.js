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
Object.defineProperty(exports, "__esModule", { value: true });
require("../../entities/parametersObjects/conditionsParamsObject");
const ruleParamsObject_1 = __importDefault(require("../../entities/parametersObjects/ruleParamsObject"));
const loadConditionsFromJSON_1 = require("../readJSON/loadConditionsFromJSON");
const loadConclusionsFromJSON_1 = require("../readJSON/loadConclusionsFromJSON");
class FuzzyRulesDAO {
    constructor() {
        this._readConditionsFromJSON = (conditionsJSONFileName) => __awaiter(this, void 0, void 0, function* () {
            if (!(conditionsJSONFileName in FuzzyRulesDAO.conditionsMap)) {
                let conditions = yield (0, loadConditionsFromJSON_1.getConditions)(conditionsJSONFileName);
                FuzzyRulesDAO.conditionsMap.set(conditionsJSONFileName, conditions);
            }
            return FuzzyRulesDAO.conditionsMap.get(conditionsJSONFileName);
        });
        this._readConclusionsFromJSON = (conclusionsJSONFileName) => __awaiter(this, void 0, void 0, function* () {
            if (!(conclusionsJSONFileName in FuzzyRulesDAO.conclusionsMap)) {
                let conclusions = yield (0, loadConclusionsFromJSON_1.getConclusions)(conclusionsJSONFileName);
                FuzzyRulesDAO.conclusionsMap.set(conclusionsJSONFileName, conclusions);
            }
            return FuzzyRulesDAO.conclusionsMap.get(conclusionsJSONFileName);
        });
        this.getRuleParamsObject = (conditionsJSONFileName, conclusionsJSONFileName) => __awaiter(this, void 0, void 0, function* () {
            let conditionsParamsObject = yield this._readConditionsFromJSON(conditionsJSONFileName);
            let conclusionsParams = yield this._readConclusionsFromJSON(conclusionsJSONFileName);
            return new ruleParamsObject_1.default(conditionsParamsObject, conclusionsParams);
        });
    }
    static get instance() {
        if (!this._instance) {
            FuzzyRulesDAO._instance = new FuzzyRulesDAO();
        }
        return this._instance;
    }
}
exports.default = FuzzyRulesDAO;
FuzzyRulesDAO.conditionsMap = new Map();
FuzzyRulesDAO.conclusionsMap = new Map();
