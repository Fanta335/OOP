class BMI {
  private _heightM: number;
  private _weightKg: number;

  constructor(heightM: number, weightKg: number) {
    this._heightM = heightM;
    this._weightKg = weightKg;
  }

  public get weightKg() {
    return this._weightKg;
  }

  public get value(): number {
    return this._weightKg / (this._heightM * this._heightM);
  }
}

class Animal {
  protected _species: string;
  protected _bmi: BMI;
  protected _lifeSpanDays: number;
  protected _biologicalSex: string;
  protected _spawnTime: Date;
  protected _deathTime?: Date;
  protected _hungerPercent = 100;
  protected _sleepPercent = 100;

  constructor(species: string, heightM: number, weightKg: number, lifeSpanDays: number, biologicalSex: string) {
    this._species = species;
    this._bmi = new BMI(heightM, weightKg);
    this._lifeSpanDays = lifeSpanDays;
    this._biologicalSex = biologicalSex;
    this._spawnTime = new Date();
  }

  public eat() {
    if (!this.isAlive()) return;
    this._hungerPercent = 0;
  }

  public setAsHungry() {
    return this._hungerPercent >= 70;
  }

  public sleep() {
    if (!this.isAlive()) return;
    this._sleepPercent = 0;
  }

  public setAsSleepy() {
    if (!this.isAlive()) return;
    this._sleepPercent >= 70;
  }

  public die() {
    this._sleepPercent = 0;
    this._hungerPercent = 0;
    this._deathTime = new Date();
  }

  public isAlive() {
    return this._deathTime === undefined;
  }

  public move() {
    if (!this.isAlive()) return;
    console.log("This animal just moved...");
  }

  public status() {
    return (
      this._species +
      " status:" +
      " Hunger - " +
      this._hungerPercent +
      "%, " +
      "sleepiness: " +
      this._sleepPercent +
      "%" +
      ", Alive - " +
      this.isAlive() +
      ". First created at " +
      this.dateCreated()
    );
  }

  public dateCreated() {
    return this._spawnTime.toLocaleString("ja-JP");
  }
}

class Mammal extends Animal {
  private _furLengthCm: number;
  private _furType: string;
  private _toothCounter = 0;
  private _bodyTemperatureC: number;
  private _avgBodyTemperatureC: number;
  private _mammaryGland = false;
  private _sweatGland = true;
  private _isPregnant = false;

  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    furLengthCm: number,
    furType: string,
    avgBodyTemperatureC: number
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex);

    this._furLengthCm = furLengthCm;
    this._furType = furType;
    this._mammaryGland = this._biologicalSex === "female";
    this._avgBodyTemperatureC = avgBodyTemperatureC;
    this._bodyTemperatureC = this._avgBodyTemperatureC;
  }

  public sweat() {
    if (!this.isAlive()) return;
    if (this._sweatGland) console.log("Sweating...");
    this._bodyTemperatureC -= 0.3;
    console.log("Body temperature is now " + this._bodyTemperatureC + "C");
    console.log();
  }

  public produceMilk() {
    if (!this.isAlive()) return;

    if (this.isPregnant() && this._mammaryGland) console.log("Producing milk...");
    else console.log("Cannot produce milk!");
    console.log();
  }

  // 哺乳類は他の哺乳類と交尾します
  // 双方の動物が同じ種である場合にのみ、発情することができます。
  // 動物がオスで他の動物がメスの場合、他の動物は発情します。この動物がメスで、もう一方の動物がオスの場合、この動物は発情します。
  // 親の状態にアクセスすることに注意してください。
  public mate(mammal: Mammal) {
    if (!this.isAlive()) return;

    if (this._species !== mammal._species) return;

    if (this._biologicalSex === "female" && mammal._biologicalSex === "male") this.fertilize();
    else if (this._biologicalSex === "male" && mammal._biologicalSex === "female") mammal.fertilize();
  }

  public fertilize() {
    if (!this.isAlive()) return;

    this._isPregnant = true;
  }

  public isPregnant() {
    if (!this.isAlive()) return;

    return this._isPregnant;
  }

  public bite() {
    if (!this.isAlive()) return;

    console.log(
      this._species +
        "bites with their single lower jaws which has" +
        (this._toothCounter === 0 ? "not" : "") +
        " replaced its teeth: " +
        (this._toothCounter > 0)
    );
    console.log();
  }

  public replaceTeeth() {
    if (!this.isAlive()) return;

    if (this._toothCounter === 0) this._toothCounter++;
  }

  public increaseBodyHeat(celcius: number) {
    this._bodyTemperatureC += celcius;
  }

  public decreaseBodyHeat(celcius: number) {
    this._bodyTemperatureC -= celcius;
  }

  public adjustBodyHeat() {
    this._bodyTemperatureC = this._avgBodyTemperatureC;
  }

  public move() {
    if (!this.isAlive()) return;
    console.log("This mammal is moving...");
    console.log();
  }

  public mammalInformation() {
    return (
      "This is a mammal with the following - " +
      "fur:" +
      this._furType +
      "/teethReplaced:" +
      (this._toothCounter > 0) +
      "/Pregnant:" +
      this.isPregnant() +
      "/Body Temperature:" +
      this._bodyTemperatureC
    );
  }

  public eat() {
    super.eat();
    this.bite();
    console.log("this " + this._species + " is eating with its single lower jaw");
  }
}

class Bird extends Animal {
  protected _featherLengthCm: number;
  protected _featherType: string;
  protected _beakLengthCm: number;
  protected _bodyTemperatureC: number;
  protected _avgBodyTemperatureC: number;
  protected _flyingAbility: boolean;
  protected _isPregnant = false;

  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    featherLengthCm: number,
    featherType: string,
    beakLengthCm: number,
    avgBodyTemperatureC: number,
    flyingAbility: boolean
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex);

    this._featherLengthCm = featherLengthCm;
    this._featherType = featherType;
    this._beakLengthCm = beakLengthCm;
    this._avgBodyTemperatureC = avgBodyTemperatureC;
    this._bodyTemperatureC = this._avgBodyTemperatureC;
    this._flyingAbility = flyingAbility;
  }

  public fly() {
    if (!this.isAlive()) return;

    if (this._flyingAbility) console.log("This " + this._species + " is flying!");
    else console.log("This " + this._species + " cannot fly with its wings...");
  }

  public mate(bird: Bird) {
    if (!this.isAlive()) return;

    if (this._species !== bird._species) return;

    if (this._biologicalSex === "female" && bird._biologicalSex === "male") this.fertilize();
    else if (this._biologicalSex === "male" && bird._biologicalSex === "female") bird.fertilize();
  }

  public fertilize() {
    if (!this.isAlive()) return;

    this._isPregnant = true;
  }

  public isPregnant() {
    if (!this.isAlive()) return;

    return this._isPregnant;
  }

  public increaseBodyHeat(celcius: number) {
    this._bodyTemperatureC += celcius;
  }

  public decreaseBodyHeat(celcius: number) {
    this._bodyTemperatureC -= celcius;
  }

  public adjustBodyHeat() {
    this._bodyTemperatureC = this._avgBodyTemperatureC;
  }
}

class Cow extends Mammal {
  private _brand: string;

  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    furLengthCm: number,
    furType: string,
    avgBodyTemperatureC: number,
    brand: string
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex, furLengthCm, furType, avgBodyTemperatureC);
    this._brand = brand;
  }

  public milk() {}
}

class Horse extends Mammal {
  private _brand: string;

  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    furLengthCm: number,
    furType: string,
    avgBodyTemperatureC: number,
    brand: string
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex, furLengthCm, furType, avgBodyTemperatureC);
    this._brand = brand;
  }

  public run() {}
}

class Chicken extends Bird {
  private _brand: string;

  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    featherLengthCm: number,
    featherType: string,
    beakLengthCm: number,
    avgBodyTemperatureC: number,
    flyingAbility: false,
    brand: string
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex, featherLengthCm, featherType, beakLengthCm, avgBodyTemperatureC, flyingAbility);
    this._brand = brand;
  }

  public layEggs() {}
}

class Parrot extends Bird {
  private _owner: Person;

  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    featherLengthCm: number,
    featherType: string,
    beakLengthCm: number,
    avgBodyTemperatureC: number,
    flyingAbility: true,
    owner: Person
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex, featherLengthCm, featherType, beakLengthCm, avgBodyTemperatureC, flyingAbility);
    this._owner = owner;
  }

  public speak() {}
}

class Person extends Mammal {
  private _firstName: string;
  private _lastName: string;
  private _money = 0;

  constructor(
    species: string,
    heightM: number,
    weightKg: number,
    lifeSpanDays: number,
    biologicalSex: string,
    furLengthCm: number,
    furType: string,
    avgBodyTemperatureC: number,
    firstName: string,
    lastName: string,
  ) {
    super(species, heightM, weightKg, lifeSpanDays, biologicalSex, furLengthCm, furType, avgBodyTemperatureC);
    this._firstName = firstName;
    this._lastName = lastName;
  }
}

