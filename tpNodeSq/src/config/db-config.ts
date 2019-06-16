import dbCfg from './database.cfg';


// db config
export interface IDbConfig {
	dialect: "mssql" | "mysql" | "postgres" | "sqlite" | "mariadb",
	host: string,
	port: number,
	database : string
	user: string
	password : string ;
}


export const confDb : IDbConfig = dbCfg.dev as any;//or dbCfg.prod
if(confDb.port === undefined) {
   if(confDb.dialect=="mysql") {
	   confDb.port=3306;
   }
}

