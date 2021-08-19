interface Audible {
  makeNoise(): void;
  soundFrequency(): number;
  soundLevel(): number;
}

interface Edible {
  howToPrepare(): string;
  calories(): number;
}

class Person implements Audible {
  private _firstName: string;
  private _lastName: string;
  private _heightM: number;
  private _weightKg: number;
  private _age: number;

  constructor(firstName: string, lastName: string, heightM: number, weightKg: number, age: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._heightM = heightM;
    this._weightKg = weightKg;
    this._age = age;
  }

  public get fullName() {
    return this._firstName + " " + this._lastName;
  }

  public toString() {
    return this.fullName + " who is " + this._heightM + "m tall and weights " + this._weightKg + "kg.";
  }

  public makeNoise() {
    console.log("Hello world.");
  }

  public soundFrequency() {
    return this._age > 16 ? 110 : 130;
  }

  public soundLevel() {
    return this._age > 16 ? 60 : 65;
  }
}

class Horse implements Audible {
  private _weightKg: number;
  private _soundFrequency = 120;
  private _soundDecibels = 75;

  constructor(weightKg: number) {
    this._weightKg = weightKg;
  }

  public toString() {
    return "This is a horse that weights: " + this._weightKg + "kg.";
  }

  public makeNoise() {
    console.log("Neeeeeeighhhh!!");
  }

  public soundFrequency() {
    return this._soundFrequency;
  }

  public soundLevel() {
    return this._soundDecibels;
  }
}

class Cow implements Audible, Edible {
  private _weightKg;
  private _soundFrequency = 90;
  private _soundDecibels = 70;

  constructor(weightKg: number) {
    this._weightKg = weightKg;
  }

  public toString() {
    return "This is a cow that weights: " + this._weightKg + " kg.";
  }

  public makeNoise() {
    console.log("Moooooooooooooo!");
  }

  public soundFrequency() {
    return this._soundFrequency;
  }

  public soundLevel() {
    return this._soundDecibels;
  }

  public howToPrepare() {
    return "Cut the cow with a butchering knife into even pieces, and grill each piece at 220C";
  }

  public calories() {
    return this._weightKg * 1850;
  }
}

class Truck implements Audible {
  private _weightKg: number;

  constructor(weightKg: number) {
    this._weightKg = weightKg;
  }

  public toString() {
    return "This is a truck that weights: " + this._weightKg + "kg";
  }

  public makeNoise() {
    console.log("Beep Beep!!");
  }

  public soundFrequency() {
    return 165;
  }

  public soundLevel() {
    return 120;
  }
}

class Violin implements Audible {
  private _soundFrequency = 659.3;
  private static readonly _SOUND_DECIBELS = 95;

  public toString() {
    return "This is a violin that plays music: ";
  }

  public makeNoise() {
    console.log("Beep Beep!!");
  }

  public soundFrequency() {
    return this._soundFrequency;
  }

  public soundLevel() {
    return Violin._SOUND_DECIBELS;
  }
}

function personInteractsWithObject(p: Person, noiseObject: Audible) {
  console.log(p + " will interact with " + noiseObject + " and cause it to make a noise");
  noiseObject.makeNoise();
  console.log("The noise was made at " + noiseObject.soundFrequency() + " Hz at a level of " + noiseObject.soundLevel() + " dB");
  console.log();
}

function personEatsEdible(p: Person, rawFood: Edible) {
  console.log(p + " will prepare and eat: " + rawFood + " They do the following: " + rawFood.howToPrepare());
  console.log("The person prepared and ate the meal. " + rawFood.calories() + " calories consumed.");
  console.log();
}

let ashley = new Person("Ashley", "William", 1.8, 110, 29);
let obj1 = new Person("Toshi", "Takemura", 1.7, 105, 41);
let obj2 = new Horse(450);
let obj3 = new Cow(1300);
let obj4 = new Truck(3230.5);
let obj5 = new Violin();

personInteractsWithObject(ashley, obj1);
personInteractsWithObject(ashley, obj2);

personInteractsWithObject(ashley, obj3);
personEatsEdible(ashley, obj3);
