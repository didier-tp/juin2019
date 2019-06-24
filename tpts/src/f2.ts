class C1 {
    constructor(public x:number,public y:number){}
}

async function f1(a:number) : Promise<C1>{
    if(a==0) throw new Error("a should not be equals to 0");
    return new C1(a,a);
}

f1(3)
.then(c1=>console.log(c1))