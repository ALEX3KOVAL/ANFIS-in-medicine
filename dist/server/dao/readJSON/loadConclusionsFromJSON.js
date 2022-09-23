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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConclusions = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
let getConclusions = (jsonFileName) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, promises_1.readFile)((0, path_1.resolve)(__dirname, `./../../../../assets/${jsonFileName}`));
    return JSON.parse('' + data);
});
exports.getConclusions = getConclusions;
