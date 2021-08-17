abstract class Shape2D {
  protected _scale: number = 1;
  protected _borderColor = "black";
  protected _backGroundColor = "white";
  protected _createdTime: Date;

  constructor() {
    this._createdTime = new Date();
  }

  public get scale(): number {
    return this._scale;
  }
  public set scale(value: number) {
    this._scale = value;
  }
  public get borderColor() {
    return this._borderColor;
  }
  public set borderColor(value) {
    this._borderColor = value;
  }
  public get backGroundColor() {
    return this._backGroundColor;
  }
  public set backGroundColor(value) {
    this._backGroundColor = value;
  }
  public get createdTime(): Date {
    return this._createdTime;
  }
  public set createdTime(value: Date) {
    this._createdTime = value;
  }

  // abstract methods
  public abstract get description(): string;
  public abstract get area(): number;
  public abstract get perimeter(): number;
  public toString() {
    return this.description + " created at " + this.createdTime;
  }
}

class Square extends Shape2D {
  protected _l: number;

  constructor(l: number) {
    super();
    this._l = l;
  }

  public get description() {
    return "This is a square! It contains the length of one side, and all sides are equal.";
  }

  public get area() {
    return this._l * this._l;
  }

  public get perimeter() {
    return this._l * 4;
  }
}

class Rectangle extends Shape2D {
  protected _l: number;
  protected _h: number;

  constructor(l: number, h: number) {
    super();
    this._l = l;
    this._h = h;
  }

  public get description() {
    return "This is a rectangle! It contains the length and height of a rectangle.";
  }

  public get area() {
    return this._l * this._h;
  }

  public get perimeter() {
    return 2 * (this._h + this._l);
  }
}

class Circle extends Shape2D {
  protected _r: number;

  constructor(r: number) {
    super();
    this._r = r;
  }

  public get description() {
    return "This is a circle! It contains the radius length of the circle.";
  }

  public get area() {
    return Math.PI * (this._r * this._r);
  }

  //円周を返す
  public get perimeter() {
    return this.getCircumference();
  }

  //円周
  public getCircumference() {
    return 2 * Math.PI * this._r;
  }
}

// 正五角形とする
class Pentagon extends Shape2D {
  protected _l: number;

  constructor(l: number) {
    super();
    this._l = l;
  }

  public get description() {
    return "This is a penetagon! It contains the lengths of one side. All sides are equal.";
  }

  public get area() {
    return (5 * this._l * this._l) / (4 * Math.tan(Math.PI / 5));
  }

  public get perimeter() {
    return this._l * 5;
  }
}

function shapePrinter(obj: Shape2D) {
  console.log("" + obj);
  console.log("More data: area- " + obj.area + ", perimeter- " + obj.perimeter);
  console.log();
}

let obj1 = new Square(4);
let obj2 = new Rectangle(3,5);
let obj3 = new Circle(9);
let obj4 = new Pentagon(4);

shapePrinter(obj1);
shapePrinter(obj2);
shapePrinter(obj3);
shapePrinter(obj4);
