class Card {
  rank: string;
  suit: string;

  constructor(rank: string, suit: string) {
    this.rank = rank;
    this.suit = suit;
  }
}

class Deck {
  static readonly SUITS = ["♠","♡","♢","♣"];
  static readonly RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  cards: Card[];

  constructor(){
    this.cards = Deck.createDeck();
  }

  static createDeck():Card[] {
    let s = Deck.SUITS.length;
    let r = Deck.RANKS.length;
    //js,tsは動的配列を使用するため、空の配列で初期化すればOK
    let cards:Card[] = [];

    for(let i = 0; i < s; i++){
      for(let j = 0; j < r; j++){
        cards.push(new Card(Deck.RANKS[j], Deck.SUITS[i]));
      }
    }
    return cards;
  }

  //フィッシャーズアルゴリズム
  shuffleDeck(){
    let deckSize = this.cards.length;

    //最後から始めて、ランダムにスワップを選択してから要素を移動する(i--)
    for(let i = deckSize - 1; i >= 0; i--){
      let j = Math.floor(Math.random() * (i + 1));

      let temp = this.cards[i];

      //in-place
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  static cardsToString(inputCards: Card[]){
    let s = "";

    for (let i = 0; i < inputCards.length; i++) {
      const curr = inputCards[i];
      s += curr.rank + curr.suit;
    }
    return s;
  }

  static shuffleDeckInPlace(cards: Card[]){
    let deckSize = cards.length;

    for(let i = deckSize-1; i >= 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      let temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
  }

  static shuffleDeckOutOfPlace(cards: Card[]){
    let result:Card[] = [];
    Deck.shuffleDeckInPlace(cards);
    result = cards;
    return result;
  }
}

let d = new Deck();
console.log(d);

let myCards = Deck.createDeck();
console.log(Deck.cardsToString(myCards));
console.log("Shuffled Deck!!");
d.shuffleDeck();
console.log(d);
