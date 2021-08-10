class Battery7v {
  manufacturer: string;
  model: string;
  //staticを使用することでインスタンスを作成せずにメンバ変数にアクセスすることができる
  static readonly voltage: number = 7.2;
  static type: string = "Lithium-Ion";
  //tsのdefault valueはundefinedなので、0を設定しておく
  static manufacturedCount: number = 0;
  ampHours: number;
  weightKg: number;
  dimensionMm: number[];

  constructor(
    manufacturer: string,
    model: string,
    ampHours: number,
    weightKg: number,
    wMm: number,
    hMm: number,
    dMm: number
  ) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.ampHours = ampHours;
    this.weightKg = weightKg;
    this.dimensionMm = [wMm, hMm, dMm];

    Battery7v.manufacturedCount++;
  }

  toString() {
    return (
      this.manufacturer +
      " " +
      this.model +
      " " +
      Battery7v.type +
      " " +
      this.getPowerCapacity() +
      " " +
      this.dimensionMm[0] +
      " " +
      this.dimensionMm[1] +
      " " +
      this.dimensionMm[2] +
      " " +
      this.getVolume() +
      " " +
      this.weightKg
    );
  }

  getPowerCapacity() {
    return Battery7v.voltage * this.ampHours;
  }

  getVolume() {
    return this.dimensionMm[0] * this.dimensionMm[1] * this.dimensionMm[2];
  }
}

let zlD72 = new Battery7v("MT-Dell Tech", "ZL-D72", 9.9, 1.18, 38, 80, 70);
let zlD50 = new Battery7v("MT-Dell Tech", "ZL-D50", 6.6, 0.9, 28, 50, 65);
let zlD40 = new Battery7v("MT-Dell Tech", "ZL-D40", 5.3, 1.18, 38, 80, 70);

console.log(zlD72);
console.log(zlD50);
console.log(zlD40);

console.log(Battery7v.manufacturedCount);

console.log("Changing the internal structure of Battery7v!");

let mdPL140 = new Battery7v("BowserPower", "MD-PL140", 9.9, 1.18, 89, 119, 85);
// mdPL140.voltage //エラー　js,tsではstatic property, static methodにはインスタンスからアクセスできない。
// Battery7v.voltage = 14.4; //readonly修飾子によってconstructor関数以外ではアサインすることができなくなっている。
console.log(Battery7v.voltage);

console.log(mdPL140);
