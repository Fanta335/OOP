class Battery {
  manufacturer: string;
  model: string;
  voltage: number;
  ampHours: number;
  weightKg: number;
  dimensionMm: number[];

  constructor(
    manufacturer: string,
    model: string,
    voltage: number,
    ampHours: number,
    weightKg: number,
    wMm: number,
    hMm: number,
    dMm: number
  ) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.voltage = voltage;
    this.ampHours = ampHours;
    this.weightKg = weightKg;
    this.dimensionMm = [wMm, hMm, dMm];
  }

  toString(): string {
    return (
      this.manufacturer +
      " " +
      this.model +
      " " +
      this.voltage +
      " " +
      this.ampHours +
      " " +
      this.weightKg +
      " " +
      this.dimensionMm[0] +
      " " +
      this.dimensionMm[1] +
      " " +
      this.dimensionMm[2]
    );
  }

  getPowerCapacity(): number {
    return this.voltage * this.ampHours;
  }

  isEquals(battery: Battery) {
    if (this.toString() === battery.toString()) return true;
    return false;
  }

  isBigger(battery: Battery) {
    let size1 = this.dimensionMm.reduce((res, el) => res * el);
    let size2 = battery.dimensionMm.reduce((res, el) => res * el);
    if (size1 > size2) return true;
    return false;
  }

  isBiggerOrEqual(battery: Battery) {
    if (this.isEquals(battery) && this.isBigger(battery)) return true;
    return false;
  }

  isSmaller(battery: Battery) {
    if (!(this.isEquals(battery) && this.isBigger(battery))) return true;
    return false;
  }

  isSmallerOrEqual(battery: Battery) {
    if (!this.isBigger(battery)) return true;
    return false;
  }
}

let mc96 = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, 72, 97, 51.5);
let mc60 = new Battery("VTec", "MC60", 14.4, 4.2, 0.35, 52, 77, 40.5);
// let mdPL140 = new Battery("BowserPower", "MD-PL140", 14.4, 9.9, 1.18, 89, 119, 85);
// let zlD72 = new Battery("MT-Dell Tech", "ZL-D72", 7.2, 9.9, 1.18, 38, 80, 70);

let mc96Second = mc96;
let mc96Third = new Battery("VTec", "MC96", 14.4, 6.6, 0.55, 72, 97, 51.5);

console.log(mc60.isBigger(mc96));
console.log(mc60.isSmaller(mc96));
