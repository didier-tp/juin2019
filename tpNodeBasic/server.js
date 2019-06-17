"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var devise_1 = require("./devise");
var bodyParser = __importStar(require("body-parser"));
var app = express_1.default();
var apiErrorHandler_1 = require("./apiErrorHandler");
//JEUX DE DONNEES (TP):
var mapDevises = new Map();
mapDevises.set("EUR", new devise_1.Devise("EUR", "euro", 1));
mapDevises.set("USD", new devise_1.Devise("USD", "dollar", 1.1));
mapDevises.set("GBP", new devise_1.Devise("GBP", "livre", 0.9));
mapDevises.set("JPY", new devise_1.Devise("JPY", "yen", 132));
//PRE TRAITEMENTS (à placer en haut de server.ts)
//support parsing of JSON post data
var jsonParser = bodyParser.json();
app.use(jsonParser);
//ROUTES ORDINAIRES (apres PRE traitements , avant POST traitements)
// GET http://localhost:8282/devise/EUR
app.get('/devise/:code', function (req, res, next) {
    var codeDevise = req.params.code;
    var devise = mapDevises.get(codeDevise);
    if (devise != null)
        res.send(mapDevises.get(codeDevise));
    else
        res.status(404).send({ message: 'devise not found' });
    //throw "devise not found with code="+codeDevise; //via errorHandler
    //throw new Error("devise not found with code="+codeDevise); 
    //throw new ErrorWithStatus("devise not found with code="+codeDevise,404);
    //throw new NotFoundError("devise not found with code="+codeDevise); 
    next(new apiErrorHandler_1.ErrorWithStatus("devise not found with code=" + codeDevise, 404));
});
//POST ... with body { "code": "M1" , "nom" : "monnaie1" , "change" : 1.123 }
app.post('/devise', function (req, res) {
    var devise = req.body; //as javascript object
    if (mapDevises.has(devise.code))
        throw new apiErrorHandler_1.ConflictError("devise already exist with code=" + devise.code);
    mapDevises.set(devise.code, devise);
    res.send(devise);
});
//PUT ... with body { "code": "USD" , "nom" : "dollar" , "change" : 1.1 }
app.put('/devise', function (req, res) {
    var devise = req.body; //as javascript object
    if (!mapDevises.has(devise.code))
        throw new apiErrorHandler_1.NotFoundError("cannot update, devise not found with code=" + devise.code);
    mapDevises.set(devise.code, devise);
    res.send(devise);
});
// DELETE http://localhost:8282/devise/EUR
app.delete('/devise/:code', function (req, res, next) {
    var codeDevise = req.params.code;
    if (!mapDevises.has(codeDevise))
        throw new apiErrorHandler_1.NotFoundError("cannot delete, devise not found with code=" + codeDevise);
    mapDevises.delete(codeDevise);
    res.status(200).send({ "action": "devise with code=" + codeDevise + " was deleted" });
});
// http://localhost:8282/devise renvoyant tout [ {} , {}]
// http://localhost:8282/devise?changeMini=1.1 renvoyant [{}] selon critere
app.get('/devise', function (req, res) {
    // necessite option "downlevelIteration": true dans tsconfig.json
    var dataAsArray = __spread(mapDevises.values());
    if (req.query.changeMini) {
        //filtrage selon critère changeMini:
        dataAsArray = dataAsArray.filter(function (dev) { return dev.change >= req.query.changeMini; });
    }
    res.send(dataAsArray);
});
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('<h3>index (developper page) of deviseApp</h3>');
    res.write('<a href="devise/EUR">devise euro as Json string</a><br/>');
    res.write('<a href="devise">toutes les devises (Json)</a><br/>');
    res.write('<a href="devise?changeMini=1.1">devises avec change >= 1.1 (Json)</a><br/>');
    res.write('<p>utiliser POSTMAN ou autre pour tester en mode POST,PUT,DELETE</p>');
    res.write("</body></html>");
    res.end();
});
//POST TRAITEMENTS (à placer en bas de server.ts):
app.use(apiErrorHandler_1.apiErrorHandler); //pour gérer les erreurs/exceptions
//pas rattrapées par try/catch et qui se propagent
//alors automatiquement au niveau "express appelant mon code"
app.listen(8282, function () {
    console.log("http://localhost:8282");
});
