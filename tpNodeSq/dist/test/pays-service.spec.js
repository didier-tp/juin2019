"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var pays_1 = require("../model/pays");
var sqPaysService_1 = require("../dao/sqPaysService");
var global_db_model_1 = require("../model/global-db-model");
var expect = chai_1.default.expect;
var paysDataService = new sqPaysService_1.SqPaysService();
describe("internal paysService", function () {
    before(function (done) {
        // runs before all tests :
        //insertion d'un jeu de données:
        global_db_model_1.sequelize.sync({ logging: console.log })
            .then(function () {
            console.log("sequelize is initialized");
            paysDataService.deleteAll()
                .then(function () { return paysDataService.saveOrUpdate(new pays_1.PaysObject(null, "France", "Paris")); })
                .then(function () { return paysDataService.saveOrUpdate(new pays_1.PaysObject(null, "Allemagne", "Berlin")); })
                .then(function () { return paysDataService.saveOrUpdate(new pays_1.PaysObject(null, "Belgique", "Bruxelles")); })
                .then(function () { return paysDataService.saveOrUpdate(new pays_1.PaysObject(null, "Italie", "Rome")); })
                .then(function () { done(); });
        }).catch(function (err) { console.log('An error occurred :', err); });
    });
    describe("getAllPays", function () {
        it("returning at least 4 pays", function () {
            return __awaiter(this, void 0, void 0, function () {
                var pays;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, paysDataService.findAll()];
                        case 1:
                            pays = _a.sent();
                            console.log(JSON.stringify(pays));
                            expect(pays.length).to.gte(4); //greater or equals
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("getPaysByName", function () {
        it("capitale paris for france", function () {
            return __awaiter(this, void 0, void 0, function () {
                var paysFr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, paysDataService.findByName("France")];
                        case 1:
                            paysFr = _a.sent();
                            console.log(JSON.stringify(paysFr));
                            expect(paysFr.capitale).equals("Paris");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
