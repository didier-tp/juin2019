import express , { Request, Response ,NextFunction, ErrorRequestHandler} from 'express';
import { Devise } from './devise';
import * as bodyParser from 'body-parser';
var app :express.Application = express();
import { ErrorWithStatus , apiErrorHandler, NotFoundError, ConflictError} from './apiErrorHandler'


//JEUX DE DONNEES (TP):

var mapDevises = new Map<string,Devise>();
mapDevises.set("EUR",new Devise("EUR" , "euro" , 1));
mapDevises.set("USD",new Devise("USD" , "dollar" , 1.1));
mapDevises.set("GBP",new Devise("GBP" , "livre" , 0.9));
mapDevises.set("JPY",new Devise("JPY" , "yen" , 132));

//PRE TRAITEMENTS (à placer en haut de server.ts)

//support parsing of JSON post data
var jsonParser = bodyParser.json() ;
app.use(jsonParser);


//ROUTES ORDINAIRES (apres PRE traitements , avant POST traitements)

// GET http://localhost:8282/devise/EUR
app.get('/devise/:code', function(req :Request, res :Response , next: NextFunction ) {
     let codeDevise = req.params.code;
     let devise = mapDevises.get(codeDevise);
     if(devise!=null)
         res.send(mapDevises.get(codeDevise));
     else 
         //res.status(404).send({message:'devise not found'});
         //throw "devise not found with code="+codeDevise; //via errorHandler
         //throw new Error("devise not found with code="+codeDevise); 
         //throw new ErrorWithStatus("devise not found with code="+codeDevise,404);
         throw new NotFoundError("devise not found with code="+codeDevise); 
         //next(new ErrorWithStatus("devise not found with code="+codeDevise,404)); 
});

//POST ... with body { "code": "M1" , "nom" : "monnaie1" , "change" : 1.123 }
app.post('/devise' , function(req :Request, res :Response ) {
    let  devise :Devise =  req.body ; //as javascript object
    if(mapDevises.has(devise.code))
       throw new ConflictError("devise already exist with code="+devise.code);
    mapDevises.set(devise.code,devise);
    res.send(devise);
});

//PUT ... with body { "code": "USD" , "nom" : "dollar" , "change" : 1.1 }
app.put('/devise' , function(req :Request, res :Response ) {
    let  devise :Devise =  req.body ; //as javascript object
    if(!mapDevises.has(devise.code))
       throw new NotFoundError("cannot update, devise not found with code="+devise.code);
    mapDevises.set(devise.code,devise);
    res.send(devise);
});

// DELETE http://localhost:8282/devise/EUR
app.delete('/devise/:code', function(req :Request, res :Response , next: NextFunction ) {
    let codeDevise = req.params.code;
    if(!mapDevises.has(codeDevise))
       throw new NotFoundError("cannot delete, devise not found with code="+codeDevise);
    mapDevises.delete(codeDevise);
    res.status(200).send({ "action" : "devise with code="+codeDevise + " was deleted"});
});


// http://localhost:8282/devise renvoyant tout [ {} , {}]
// http://localhost:8282/devise?changeMini=1.1 renvoyant [{}] selon critere
app.get('/devise', function(req :Request, res :Response ) {
    // necessite option "downlevelIteration": true dans tsconfig.json
    let dataAsArray : Devise[] = [... mapDevises.values()];
    if(req.query.changeMini){
        //filtrage selon critère changeMini:
        dataAsArray = dataAsArray.filter((dev)=>dev.change >= req.query.changeMini);
    }
    res.send(dataAsArray);
});

app.get('/', function(req :Request, res :Response ) {
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

app.use(apiErrorHandler); //pour gérer les erreurs/exceptions
                          //pas rattrapées par try/catch et qui se propagent
                          //alors automatiquement au niveau "express appelant mon code"


app.listen(8282 , function () {
    console.log("http://localhost:8282");
});