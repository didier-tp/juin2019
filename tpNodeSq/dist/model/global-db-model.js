"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sq_devise_1 = require("./sq-devise");
var db_config_1 = require("../config/db-config");
var sq_pays_1 = require("./sq-pays");
//import { PaysModelStatic , initPaysModel } from "./sq-pays";
var MyApiModels = /** @class */ (function () {
    function MyApiModels() {
    }
    return MyApiModels;
}());
exports.MyApiModels = MyApiModels;
var MySqDatabase = /** @class */ (function () {
    function MySqDatabase() {
        this.dbname = "unknown";
        this.models = new MyApiModels();
        var model;
        var sqOptions = {
            dialect: db_config_1.confDb.dialect,
            port: db_config_1.confDb.port,
            logging: /*console.log*/ false,
            define: {
                timestamps: false
            }
        };
        var password = db_config_1.confDb.password ? db_config_1.confDb.password : "";
        this.sequelize = new sequelize_1.Sequelize(db_config_1.confDb.database, db_config_1.confDb.user, password, sqOptions);
        this.dbname = db_config_1.confDb.database;
        this.models.devises = sq_devise_1.initDeviseModel(this.sequelize);
        this.models.pays = sq_pays_1.initPaysModel(this.sequelize);
        this.models.devises.hasMany(this.models.pays);
        //this.models.pays.belongsTo(this.models.devises);
    }
    MySqDatabase.prototype.getModels = function () {
        return this.models;
    };
    MySqDatabase.prototype.getSequelize = function () {
        return this.sequelize;
    };
    return MySqDatabase;
}());
exports.MySqDatabase = MySqDatabase;
exports.database = new MySqDatabase();
exports.models = exports.database.getModels();
exports.sequelize = exports.database.getSequelize();
function initSequelize() {
    exports.sequelize.sync({ logging: console.log })
        .then(function () {
        console.log("sequelize is initialized");
    }).catch(function (err) { console.log('An error occurred :', err); });
}
exports.initSequelize = initSequelize;
