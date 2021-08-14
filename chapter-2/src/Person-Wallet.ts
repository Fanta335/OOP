// class Wallet {
//   bill1 = 0;
//   bill5 = 0;
//   bill10 = 0;
//   bill20 = 0;
//   bill50 = 0;
//   bill100 = 0;

//   constructor() {}

//   getTotalMoney() {
//     return (
//       1 * this.bill1 +
//       5 * this.bill5 +
//       10 * this.bill10 +
//       20 * this.bill20 +
//       50 * this.bill50 +
//       100 * this.bill100
//     );
//   }

//   insertBill(bill: 1 | 5 | 10 | 20 | 50 | 100, amount: number) {
//     switch (bill) {
//       case 1:
//         this.bill1 += amount;
//         break;
//       case 5:
//         this.bill5 += amount;
//         break;
//       case 10:
//         this.bill10 += amount;
//         break;
//       case 20:
//         this.bill20 += amount;
//         break;
//       case 50:
//         this.bill50 += amount;
//         break;
//       case 100:
//         this.bill100 += amount;
//         break;
//       default:
//         return 0;
//     }
//     return bill * amount;
//   }
// }

// class Person {
//   firstName: string;
//   lastName = "?????";
//   age = 20;
//   heightM: number;
//   weightKg: number;
//   wallet: Wallet | null;

//   constructor(firstName: string, lastName: string, x: number, y: number, z: number) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = x;
//     this.heightM = y;
//     this.weightKg = z;
//     this.wallet = new Wallet();
//   }

//   getFullName() {
//     return this.firstName + " " + this.lastName;
//   }

//   getCash() {
//     if (this.wallet === null) {
//       console.log("no wallet");
//       return 0;
//     }
//     return this.wallet.getTotalMoney();
//   }

//   dropWallet() {
//     const w = this.wallet;
//     this.wallet = null;
//     return w;
//   }

//   addWallet(wallet: Wallet) {
//     if (this.wallet === null) this.wallet = wallet;
//   }
// }

// class Address {
//   private address: string;
//   private city: string;
//   private country: string;

//   constructor(address: string, city: string, country: string) {
//     this.address = address;
//     this.city = city;
//     this.country = country;
//   }
// }
