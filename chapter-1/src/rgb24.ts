class RGB24 {
  private red!: number;
  private green!: number;
  private blue!: number;

  constructor(red: number, green: number, blue: number);
  constructor(inputString: string);
  constructor(redOrInputString: number | string, green?: number, blue?: number) {
    if (typeof redOrInputString === "string") {
      let l = redOrInputString.length;

      if (l === 6) this.setColorByHex(redOrInputString);
      else if (l === 24) this.setColorByBin(redOrInputString);
      else this.setAsBlack();
    } else if(green !== undefined && blue !== undefined) {
      this.red = redOrInputString;
      this.green = green;
      this.blue = blue;
    }
  }

  getHex(): string {
    let result = "";
    let redHex = this.red.toString(16);
    let greenHex = this.green.toString(16);
    let blueHex = this.blue.toString(16);
    result = redHex + greenHex + blueHex;
    return result;
  }

  getBits(): string {
    let result = "";
    let redBits = this.red.toString(2);
    let greenBits = this.green.toString(2);
    let blueBits = this.red.toString(2);
    result = redBits + greenBits + blueBits;
    return result;
  }

  getColorShade(): string {
    if (this.red === this.green && this.green === this.blue) return "grayscale";
    let greatestString = "red";
    let greatest = this.red;

    if (greatest <= this.green) {
      greatestString = "green";
      greatest = this.green;
    }

    if (greatest <= this.blue) {
      greatestString = "blue";
      greatest = this.blue;
    }

    return greatestString;
  }

  setAsBlack() {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
  }

  setColorByHex(hex: string) {
    if (hex.length !== 6) this.setAsBlack();
    else {
      this.red = parseInt(hex.substring(0, 2), 16);
      this.green = parseInt(hex.substring(2, 4), 16);
      this.blue = parseInt(hex.substring(4, 6), 16);
    }
  }

  setColorByBin(bin: string) {
    if (bin.length !== 24) this.setAsBlack();
    else {
      this.red = parseInt(bin.substring(0, 8), 2);
      this.green = parseInt(bin.substring(8, 16), 2);
      this.blue = parseInt(bin.substring(16, 24), 2);
    }
  }
}

// let color1 = new RGB24(223, 34, 5);
// console.log(color1.getHex());
// console.log(color1.getBits());
