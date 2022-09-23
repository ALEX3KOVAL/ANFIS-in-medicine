"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const anfis_1 = __importDefault(require("./entities/anfis/anfis"));
let mins = [0.0, 35.6, 1.0, 1.0];
let maxs = [1000.0, 37.4, 100.0, 30.0];
let viborka = [5000.0, 39.4, 21.0, 1.0];
for (let i = 0; i < 4; i++) {
    viborka[i] = (viborka[i] - mins[i]) / (maxs[i] - mins[i]);
}
let anfis;
anfis_1.default.instance(4, "newConditions.json", "newConclusions.json", mins, maxs).
    then((anfis) => anfis.predict(viborka).then((answer) => console.log(`predict --- ${answer}`)));
