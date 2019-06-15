var s1 : string
s1="abcdef";
console.log(s1);

//déclarer un tableau de string
let tab1 : string[];

//placer quelques valeurs en minuscules
tab1 = [ "abc" , "def" , "ijk" ];

//via tableau1.map( (e) => ... )
//fabriquer un tableau2 ou chaque element est en majuscule (.toUpperCase())
let tab2 = tab1.map( (e :string ) => e.toUpperCase() );

//afficher chaque élément du tableau 2 
//avec boucle for(...of ...) et template string (quotes inverses)
for(let e of tab2){
    console.log(`*** ${e} ***`);
}

