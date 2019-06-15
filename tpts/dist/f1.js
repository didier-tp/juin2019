"use strict";
var s1;
s1 = "abcdef";
console.log(s1);
//déclarer un tableau de string
var tab1;
//placer quelques valeurs en minuscules
tab1 = ["abc", "def", "ijk"];
//via tableau1.map( (e) => ... )
//fabriquer un tableau2 ou chaque element est en majuscule (.toUpperCase())
var tab2 = tab1.map(function (e) { return e.toUpperCase(); });
//afficher chaque élément du tableau 2 
//avec boucle for(...of ...) et template string (quotes inverses)
for (var _i = 0, tab2_1 = tab2; _i < tab2_1.length; _i++) {
    var e = tab2_1[_i];
    console.log("*** " + e + " ***");
}
