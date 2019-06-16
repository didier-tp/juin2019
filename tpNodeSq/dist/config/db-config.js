"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_cfg_1 = __importDefault(require("./database.cfg"));
exports.confDb = database_cfg_1.default.dev; //or dbCfg.prod
if (exports.confDb.port === undefined) {
    if (exports.confDb.dialect == "mysql") {
        exports.confDb.port = 3306;
    }
}
