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
  });

  

});