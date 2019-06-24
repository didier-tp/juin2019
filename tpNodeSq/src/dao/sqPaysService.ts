import { PaysDataService } from './paysDataService'
import { Pays } from '../model/pays';
import { SqPays, PaysModelStatic } from '../model/sq-pays';
import { models } from '../model/global-db-model';
import { NotFoundError, ConflictError } from '../api/apiErrorHandler';
//"strictNullChecks": false in tsconfig.json

export class SqPaysService implements PaysDataService{
  
    paysModelStatic : PaysModelStatic = models.pays;

    constructor(){
    }

    findById(idPays: number): Promise<Pays> {
        return new Promise<Pays>((resolve: Function, reject: Function) => {
            this.paysModelStatic.findByPk(idPays)
              .then((obj: SqPays) => {
                //returning null by default if not Found
                if(obj!=null)
                    resolve(obj);
                else 
                   reject(new NotFoundError("Pays not found with idPays="+idPays));
              })
              .catch((error: Error) => { reject(error);});
          });
    }   

    findByName(nomPays: string): Promise<Pays> {
      return new Promise<Pays>((resolve: Function, reject: Function) => {
          this.paysModelStatic.findOne({ where : { name : nomPays} } )
            .then((obj: SqPays) => {
              //returning null by default if not Found
              if(obj!=null)
                  resolve(obj);
              else 
                 reject(new NotFoundError("Pays not found with name="+nomPays));
            })
            .catch((error: Error) => { reject(error);});
        });
  }   

    findAll(): Promise<Pays[]> {
        return new Promise((resolve,reject) => {
            this.paysModelStatic.findAll()
          .then((objects: SqPays[]) => {
            resolve(objects);
          }).catch((error: Error) => {
            reject(error);
          });
        });
    }

    insert(d: Pays): Promise<Pays> {
        return new Promise((resolve,reject) => {
            this.paysModelStatic.create(d)
            .then((obj: SqPays) => {
              //console.log("*** after insert, obj:"+JSON.stringify(obj));
              resolve(obj);
            }).catch((error: any) => {
              console.log("err:"+JSON.stringify(error));
              reject(error);
            });
         });
    }

    update(d: Pays): Promise<Pays> {
           if(d.idPays==null){
              return this.insert(d);
           }else{
              return this.update(d);
           }
    }

    saveOrUpdate(d: Pays): Promise<Pays> {
      return new Promise((resolve,reject) => {
        //.upsert() is appropriate for saveOrUpdate if no auto_incr
        this.paysModelStatic.upsert(d)
        .then((ok: Boolean) => {
          //console.log("*** after insert, obj:"+JSON.stringify(obj));
          resolve(d);
        }).catch((error: any) => {
          console.log("err:"+JSON.stringify(error));
          reject(error);
        });
     });
    }

    deleteById(idPays: number): Promise<void> {
        return new Promise((resolve,reject) => {
            this.paysModelStatic.destroy( { where: { idPays : idPays} } )
            .then(() => {
              resolve();
            }).catch((error: any) => {
              //console.log("err:"+JSON.stringify(error));
              reject(error);
            });
           });
    }

    deleteAll(): Promise<void> {
      return new Promise((resolve,reject) => {
          this.paysModelStatic.destroy( { where: { } } )
          .then(() => {
            resolve();
          }).catch((error: any) => {
            //console.log("err:"+JSON.stringify(error));
            reject(error);
          });
         });
  }

   

}