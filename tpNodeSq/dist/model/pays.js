"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//exemple: (1 , "France" , "Paris") 
//real class for instanciation ,  with constructor .
var PaysObject = /** @class */ (function () {
    function PaysObject(idPays, name, capitale) {
        if (idPays === void 0) { idPays = 0; }
        if (name === void 0) { name = "?"; }
        if (capitale === void 0) { capitale = "?"; }
        this.idPays = idPays;
        this.name = name;
        this.capitale = capitale;
    }
    return PaysObject;
}());
exports.PaysObject = PaysObject;
