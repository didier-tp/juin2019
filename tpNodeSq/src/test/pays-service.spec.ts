import chai from 'chai'; 
import { PaysDataService } from "../dao/paysdataService";
import { Pays, PaysObject } from '../model/pays';
import { SqPaysService } from '../dao/sqPaysService';
import { sequelize } from '../model/global-db-model';
let expect = chai.expect;

var paysDataService : PaysDataService =new SqPaysService();

describe("internal paysService", function() {

  before(function(done) {
    // runs before all tests :
    //insertion d'un jeu de données:
    sequelize.sync({logging: console.log})
			  .then(
				()=>{ 
              console.log("sequelize is initialized");
              paysDataService.deleteAll()
              .then(()=>paysDataService.saveOrUpdate(new PaysObject(null,"France" , "Paris" )))
              .then(()=>paysDataService.saveOrUpdate(new PaysObject(null,"Allemagne" , "Berlin" )))
              .then(()=>paysDataService.saveOrUpdate(new PaysObject(null,"Belgique" , "Bruxelles" )))
              .then(()=>paysDataService.saveOrUpdate(new PaysObject(null,"Italie" , "Rome" )))
              .then(()=>{done()});
            }
			  ).catch( (err:any) => { console.log('An error occurred :', err);  });
    
  });
    
  describe("getAllPays", function() {
    it("returning at least 4 pays", async function() {
      let pays: Pays[] = await paysDataService.findAll();
      console.log(JSON.stringify(pays));
      expect(pays.length).to.gte(4); //greater or equals
    });
  });

  describe("getPaysByName", function() {
    it("capitale paris for france", async function() {
      let paysFr: Pays = await paysDataService.findByName("France");
      console.log(JSON.stringify(paysFr));
      expect(paysFr.capitale).equals("Paris");
    });
  });

  

});