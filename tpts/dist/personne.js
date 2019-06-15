"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Personne = /** @class */ (function () {
    function Personne(prenom, nom, _age) {
        if (prenom === void 0) { prenom = "?"; }
        if (nom === void 0) { nom = "?"; }
        if (_age === void 0) { _age = 0; }
        this.prenom = prenom;
        this.nom = nom;
        this._age = _age;
    }
    Object.defineProperty(Personne.prototype, "age", {
        get: function () { return this._age; },
        set: function (nouvelAge) {
            if (nouvelAge < 0)
                throw new Error("age negatif invalide");
            else
                this._age = nouvelAge;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Personne.prototype, "nomComplet", {
        get: function () { return this.prenom + " " + this.nom; },
        enumerable: true,
        configurable: true
    });
    Personne.planetePartagee = "Terre";
    return Personne;
}());
var EmployeV1 = /** @class */ (function (_super) {
    __extends(EmployeV1, _super);
    function EmployeV1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.salaire = 0;
        return _this;
    }
    return EmployeV1;
}(Personne));
var Employe = /** @class */ (function (_super) {
    __extends(Employe, _super);
    function Employe(nom, prenom, age, salaire) {
        if (nom === void 0) { nom = "?"; }
        if (prenom === void 0) { prenom = "?"; }
        if (age === void 0) { age = 0; }
        if (salaire === void 0) { salaire = 0; }
        var _this = _super.call(this, prenom, nom, age) || this;
        _this.salaire = salaire;
        return _this;
    }
    ;
    Employe.prototype.salaireComplet = function () { return this.salaire; };
    return Employe;
}(Personne));
var Commercial = /** @class */ (function (_super) {
    __extends(Commercial, _super);
    function Commercial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.commission = 200;
        return _this;
    }
    Commercial.prototype.salaireComplet = function () { return _super.prototype.salaireComplet.call(this) + this.commission; };
    return Commercial;
}(Employe));
var e1 = new EmployeV1();
console.log("e1=" + JSON.stringify(e1));
e1 = new EmployeV1("alex", "Therieur", 44);
console.log("e1=" + JSON.stringify(e1));
e1.salaire = 2000;
console.log("e1=" + JSON.stringify(e1));
var e2 = new Employe("alex", "Therieur", 44, 3000);
console.log("e2=" + JSON.stringify(e1));
var c1 = new Commercial();
c1.salaire = 1500;
c1.commission = 300;
console.log("salaireComplet=" + c1.salaireComplet());
var p1;
p1 = new Personne("jean", "Bon", 33);
try {
    p1.age = -5;
}
catch (err) {
    console.log("erreur: " + err.message + " ");
}
p1.age = 34;
console.log("nomComplet = " + p1.nomComplet + " ");
console.log("nom=" + p1.nom + " age=" + p1.age + " ");
console.log("JSON:" + JSON.stringify(p1));
var p2 = new Personne();
console.log("p2:" + JSON.stringify(p2));
