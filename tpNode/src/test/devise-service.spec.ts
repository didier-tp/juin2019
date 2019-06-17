import chai from 'chai'; 
import { DeviseDataService } from "../dao/devisedataService";
import { MemoryMapDeviseService } from "../dao/memoryMapDeviseService";
import { Devise } from '../model/devise';
let expect = chai.expect;

var deviseDataService : DeviseDataService =new MemoryMapDeviseService();

describe("internal deviseService", function() {
    
  describe("getAllDevises", function() {
    it("returning at least 4 devises", async function() {
      let devises: Devise[] = await deviseDataService.findAll();
      expect(devises.length).to.gte(4); //greater or equals
    });
  });

  describe("getDeviseByCode", function() {
   it("euro for code EUR", async function() {
      let deviseEur: Devise = await deviseDataService.findById("EUR");
      //console.log(JSON.stringify(deviseEur));
      expect(deviseEur.nom).equals("euro");
    });
    /*
    it("euro for code EUR", function(done) {
      deviseDataService.findById("EUR")
      .then((deviseEur)=> { 
              expect(deviseEur.nom).equals("euro");
              console.log("**" +JSON.stringify(deviseEur));
              done();//pour indiquer a mocha que le test unitaire est fini
              })
      .catch((err)=>console.log("erreur:"+err));
    });*/
/*
    it("saveOrUpdate_et_getByIdEnchaine", function(done) {
      //en Tp , enchainer via ....then().then().catch()
      //un ajout de nouvelle devise ("Da1")
      //une relecture de la devise 
      //let nouvelleDev :Devise = { code : "Da1" , nom : "devise a1" , change : 123};
      let nouvelleDev :Devise = { code : "Da1Wrong" , nom : "devise a1" , change : 123};
      deviseDataService.saveOrUpdate(nouvelleDev)
      .then((dEnregistree)=>{ 
        //...
        return deviseDataService.findById("Da1");
      })
      .then((deviseRelue)=>{ 
        expect(deviseRelue.nom).equals("devise a1");
        done();
      })
      .catch((err)=>{ console.log("err:" + err); 
                     done(err);//mieux que expect.fail("...") 
                      })             
    });
    */

   it("saveOrUpdate_et_getByIdEnchaine", async function() {
    try{
      let nouvelleDev :Devise = { code : "Da1" , nom : "devise a1" , change : 123};
      //let nouvelleDev :Devise = { code : "Da1Wrong" , nom : "devise a1" , change : 123};
      let dEnregistree = await deviseDataService.saveOrUpdate(nouvelleDev);
      let deviseRelue = await deviseDataService.findById("Da1");
      expect(deviseRelue.nom).equals("devise a1");
      
    }
    catch(err){ 
      console.log("err:" + err); 
       throw err;
      }             
  });

  });

  

});