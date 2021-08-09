class Point {
  x: string | number;
  y: string | undefined;

  constructor(x:number, y:string)
  constructor(s:string);
  constructor(xs: string | number, y?: string){
    if(typeof xs === "string"){
      this.x = xs;
    } else {
      this.x = xs;
      this.y = y;
    }
  }
}

class C {
  foo: number;
  bar = "helo";
  baz: boolean | undefined;

  constructor(){
    this.foo = 32;
  }
}
