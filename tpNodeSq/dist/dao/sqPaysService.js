"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_db_model_1 = require("../model/global-db-model");
var apiErrorHandler_1 = require("../api/apiErrorHandler");
//"strictNullChecks": false in tsconfig.json
var SqPaysService = /** @class */ (function () {
    function SqPaysService() {
        this.paysModelStatic = global_db_model_1.models.pays;
    }
    SqPaysService.prototype.findById = function (idPays) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.paysModelStatic.findByPk(idPays)
                .then(function (obj) {
                //returning null by default if not Found
                if (obj != null)
                    resolve(obj);
                else
                    reject(new apiErrorHandler_1.NotFoundError("Pays not found with idPays=" + idPays));
            })
                .catch(function (error) { reject(error); });
        });
    };
    SqPaysService.prototype.findByName = function (nomPays) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.paysModelStatic.findOne({ where: { name: nomPays } })
                .then(function (obj) {
                //returning null by default if not Found
                if (obj != null)
                    resolve(obj);
                else
                    reject(new apiErrorHandler_1.NotFoundError("Pays not found with name=" + nomPays));
            })
                .catch(function (error) { reject(error); });
        });
    };
    SqPaysService.prototype.findAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.paysModelStatic.findAll()
                .then(function (objects) {
                resolve(objects);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    SqPaysService.prototype.insert = function (d) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.paysModelStatic.create(d)
                .then(function (obj) {
                //console.log("*** after insert, obj:"+JSON.stringify(obj));
                resolve(obj);
            }).catch(function (error) {
                console.log("err:" + JSON.stringify(error));
                reject(error);
            });
        });
    };
    SqPaysService.prototype.update = function (d) {
        if (d.idPays == null) {
            return this.insert(d);
        }
        else {
            return this.update(d);
        }
    };
    SqPaysService.prototype.saveOrUpdate = function (d) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //.upsert() is appropriate for saveOrUpdate if no auto_incr
            _this.paysModelStatic.upsert(d)
                .then(function (ok) {
                //console.log("*** after insert, obj:"+JSON.stringify(obj));
                resolve(d);
            }).catch(function (error) {
                console.log("err:" + JSON.stringify(error));
                reject(error);
            });
        });
    };
    SqPaysService.prototype.deleteById = function (idPays) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.paysModelStatic.destroy({ where: { idPays: idPays } })
                .then(function () {
                resolve();
            }).catch(function (error) {
                //console.log("err:"+JSON.stringify(error));
                reject(error);
            });
        });
    };
    SqPaysService.prototype.deleteAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.paysModelStatic.destroy({ where: {} })
                .then(function () {
                resolve();
            }).catch(function (error) {
                //console.log("err:"+JSON.stringify(error));
                reject(error);
            });
        });
    };
    return SqPaysService;
}());
exports.SqPaysService = SqPaysService;
