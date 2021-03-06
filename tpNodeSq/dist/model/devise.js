"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//exemples: ("USD" , "dollar" , 1) ,  ("EUR" , "euro" , 0.9)
//real class for instanciation ,  with constructor .
var DeviseObject = /** @class */ (function () {
    function DeviseObject(code, nom, change) {
        if (code === void 0) { code = "?"; }
        if (nom === void 0) { nom = "?"; }
        if (change === void 0) { change = 0; }
        this.code = code;
        this.nom = nom;
        this.change = change;
    }
    return DeviseObject;
}());
exports.DeviseObject = DeviseObject;
