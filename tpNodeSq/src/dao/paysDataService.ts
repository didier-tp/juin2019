import { Pays } from "../model/pays";

export interface PaysDataService {
    findById(idPays : number) : Promise<Pays>; 
    findByName(nomPays : string) : Promise<Pays>; 
    findAll() : Promise<Pays[]>; 
    insert(p:Pays) : Promise<Pays>; 
    update(p:Pays): Promise<Pays>; 
    saveOrUpdate(p:Pays) : Promise<Pays>; 
    deleteById(idPays : number) :Promise<void> ;
    deleteAll() :Promise<void> ;
}

 
 //NB: en cas d'erreur/exception , les promesses rejetees 
 //contiendront un objet ErrorWithStatus (ou une sous classe telle que ErrorWithStatus)