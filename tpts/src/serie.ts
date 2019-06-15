class SerieV1{
    constructor(public label :string ="serie ?",
                public values :number[] =[]){
    }
    public push(val:number){
        this.values.push(val);
    }
}

class Serie<T>{
    constructor(public label :string ="serie ?",
                public values :T[] =[]){
    }
    public push(val:T){
        this.values.push(val);
    }
}

let serie1 = new Serie("serie1",[2,6,8]);
serie1.push(4); serie1.push(5);
console.log(JSON.stringify(serie1));
let serie2 : Serie<string>;
serie2 = new Serie("serie2",['abc', 'def']);
serie2.push('xyz');
console.log(JSON.stringify(serie2));