import { timingSafeEqual } from "crypto";
import { Http2ServerRequest } from "http2";
import { monitorEventLoopDelay } from "perf_hooks";

class Player {
  private userName: string;
  private health: number;
  private attack: number;
  private defense: number;
  private height = 1.8;
  private gold: number;

  constructor(userName: string, health: number, attack: number, defense: number, gold: number) {
    this.userName = userName;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.gold = gold;
  }

  getHeight() {
    return this.height;
  }

  attacks(monster: Monster) {
    console.log(this.userName + "ATTACKS" + monster.getName());

    if (monster.getHeight() >= this.height * 3 || this.attack <= monster.getDefense()) return;
    monster.attacked(this.attack - monster.getDefense());
  }
}

class Monster {
  private monster: string;
  private health: number;
  private attack: number;
  private defense: number;
  private height = 300;

  constructor(monster: string, health: number, attack: number, defense: number) {
    this.health = health;
    this.monster = monster;
    this.attack = attack;
    this.defense = defense;
  }

  getName() {
    return this.monster;
  }

  getHeight() {
    return this.height;
  }

  getAttack() {
    return this.attack;
  }

  getDefense() {
    return this.defense;
  }

  attacked(hp: number) {
    this.health -= hp;
    if (this.health < 0) this.health = 0;
  }
}

class Coordinate {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Field {
  private static readonly MAX_X = 100000;
  private static readonly MAX_Y = 40000;
  private static readonly MAX_Z = 1000;
  private creatures: Monster[];
  private creatureCoordinates: Coordinate[];

  constructor(creatures: Monster[], creatureCoordinates: Coordinate[]) {
    this.creatures = creatures;
    this.creatureCoordinates = creatureCoordinates;
  }

  //monsterの各パラメータを受け取り、新たなオブジェクトを追加している。
  //このメソッドの内部構造を知らない開発者は、monsterとfieldの依存関係に気づかない可能性がある。
  randomlyAdd(monster: string, health: number, attack: number, defense: number){
    let newMonster = new Monster(monster, health, attack, defense);
    let c = new Coordinate(this.internalRanAlgorithm(1, Field.MAX_X), this.internalRanAlgorithm(1, Field.MAX_Y), this.internalRanAlgorithm(1, Field.MAX_Z));

    this.creatures.push(newMonster);
    this.creatureCoordinates.push(c);
  }

  //monsterのインスタンスを受け取ることで、より依存関係が明確になる
  //ポイントは、入力に指定すること
  randomlyAddWithDependency(creature: Monster){
    let c = new Coordinate(this.internalRanAlgorithm(1, Field.MAX_X), this.internalRanAlgorithm(1, Field.MAX_Y), this.internalRanAlgorithm(1, Field.MAX_Z));

    this.creatures.push(creature);
    this.creatureCoordinates.push(c);
  }

  internalRanAlgorithm(min: number, max:number){
    return Math.random() * (max - min) + min;
  }
}

let p1 = new Player("Batrunner", 2000, 200, 60, 1000);
let gorilla = new Monster("Gorilla", 4000, 40, 100);
let vampire = new Monster("Vampire", 6000, 160, 20);

console.log(p1);
console.log(gorilla);
console.log(vampire);

p1.attacks(gorilla);
console.log(gorilla);

// UMLでは、Player ---> Monster となり、プレイヤークラスがモンスタークラスに依存していることになる。
