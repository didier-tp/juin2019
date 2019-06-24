import { Sequelize , Model }from "sequelize";
import { DeviseModelStatic , initDeviseModel } from './sq-devise';
import { confDb  } from "../config/db-config"
import { PaysModelStatic, initPaysModel } from "./sq-pays";
//import { PaysModelStatic , initPaysModel } from "./sq-pays";

export class MyApiModels {
    public devises! : DeviseModelStatic;
    public pays! : PaysModelStatic;
  }
  
  export class MySqDatabase {
    private models: MyApiModels;
    private sequelize: Sequelize;
    public dbname: string = "unknown";
  
    constructor() {
      this.models = new MyApiModels();
      let model: any;
      let sqOptions = {
            dialect: confDb.dialect,
            port : confDb.port,
            logging: /*console.log*/false, // false or console.log,// permet de voir les logs de sequelize
            define: {
                timestamps: false
            }
      };
      var password = confDb.password ? confDb.password : "";
      this.sequelize = new Sequelize(confDb.database, confDb.user, password, sqOptions);
      this.dbname = confDb.database;
     
     this.models.devises= initDeviseModel(this.sequelize);
     this.models.pays= initPaysModel(this.sequelize);
     this.models.devises.hasMany(this.models.pays);
     //this.models.pays.belongsTo(this.models.devises);
      
    }
  
    getModels() {
      return this.models;
    }
  
    getSequelize() {
      return this.sequelize;
    }
  }
  
  export const database: MySqDatabase = new MySqDatabase();
  export const models = database.getModels();
  export const sequelize: Sequelize = database.getSequelize();

  export function initSequelize(){
    sequelize.sync({logging: console.log})
			  .then(
				()=>{ 
							console.log("sequelize is initialized");
            }
			  ).catch( (err:any) => { console.log('An error occurred :', err);  });
  }


