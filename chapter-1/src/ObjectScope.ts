class Wallet {
  bill1: number = 3;
  bill5: number = 1;
  bill10: number = 0;
  bill20: number = 0;
  bill50: number = 0;
  bill100: number = 0;

  constructor(){};

  getTotalMoney(){
    return 1*this.bill1 + 5*this.bill5 + 10*this.bill10 + 20*this.bill20 * 50*this.bill50 + 100*this.bill100;
  }

  insertBill(bill: 1|5|10|20|50|100, amount: number){
    switch (bill) {
      case 1:
        this.bill1 += amount;
        break;
      case 5:
        this.bill5 += amount;
        break;
      case 10:
        this.bill10 += amount;
        break;
      case 20:
        this.bill20 += amount;
        break;
      case 50:
        this.bill50 += amount;
        break;
      case 100:
        this.bill100 += amount;
        break;
      default:
        return 0;
    }
    return bill*amount;
  }
}

class Person {
  firstName: string;
  lastName:string = "?????";
  age: number = 20;
  heightM: number;
  weightKg: number;
  wallet: Wallet;

  constructor(firstName: string, lastName: string, x: number, y: number, z:number){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = x;
    this.heightM = y;
    this.weightKg = z;
    this.wallet = new Wallet();
  }

  getFullName(){
    return this.firstName + " " + this.lastName;
  }

  getCash(){
    if(this.wallet === null){
      console.log("no wallet");
      return 0;
    }
    return this.wallet.getTotalMoney();
  }
}

let person1 = new Person("Taro", "Tanaka", 23, 345, 34);
console.log("firstname: " + person1.firstName);
console.log("lastname: " + person1.lastName);
console.log(person1.getCash());
console.log(person1.getFullName());
