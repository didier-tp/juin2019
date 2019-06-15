class Personne {
    static planetePartagee : string = "Terre";

    constructor(public prenom="?",public nom="?" ,private _age=0){        
    }
    public get age() :number{ return this._age;}
    public get nomComplet() :string{ return this.prenom + " " + this.nom;}
    public set age(nouvelAge : number) {
       if(nouvelAge < 0)
           throw new Error("age negatif invalide");
       else
          this._age = nouvelAge;
    }
}

class EmployeV1 extends Personne{
    salaire : number = 0;
}

class Employe extends Personne{
    salaire : number;
    constructor(nom:string="?",prenom:string="?",age:number=0,salaire:number=0){
        super(prenom,nom,age);
        this.salaire=salaire; 
    };
    public salaireComplet() { return this.salaire; }
}

class Commercial extends Employe{
    commission : number = 200;
    public salaireComplet() { return super.salaireComplet() + this.commission; }
}

let e1 = new EmployeV1();
console.log("e1="+JSON.stringify(e1));
e1 = new EmployeV1("alex" , "Therieur" , 44);
console.log("e1="+JSON.stringify(e1));
e1.salaire=2000;
console.log("e1="+JSON.stringify(e1));
let e2 = new Employe("alex" , "Therieur" , 44 , 3000);
console.log("e2="+JSON.stringify(e1));
let c1 = new Commercial();
c1.salaire=1500;
c1.commission=300;
console.log("salaireComplet="+c1.salaireComplet());

let p1 : Personne ;
p1=  new Personne("jean" ,"Bon", 33);
try{
p1.age = -5;
}
catch(err){
    console.log(`erreur: ${err.message} `);
}
p1.age=34;
console.log(`nomComplet = ${p1.nomComplet} `);
console.log(`nom=${p1.nom} age=${p1.age} `);
console.log("JSON:" + JSON.stringify(p1));
let p2 = new Personne();
console.log("p2:" + JSON.stringify(p2));
