interface Fly {
  fly(): void;
  flyHeight(): number;
  flySpeed(): number;
}

class Bird implements Fly{
  private _name: string;

  constructor(name:string){
    this._name = name;
  }

  fly(){
    console.log("This bird is flying!");
  }

  flyHeight(){
    return 50;
  }

  flySpeed(){
    return 10;
  }
}

let bird1 = new Bird("birdy");
bird1.fly();

