const uuidv4 = require('uuid/v4');

export class Order {
  constructor() {
    this.uuid = uuidv4();
    this.itemList = [];
  }

  add(drink) {
    this.itemList.push(drink);
  }

  remove(item) {
    for (let drink in this.itemList) {
      if (this.itemList[drink] === item) {
        this.itemList.splice(drink, 1);
      }
    }
  }

  fetchOrder() {
    return this.itemList;
  }

}

export class Drink {
  constructor(drink) {
    this.id = drink.id;
    this.name = drink.name;
		this.price = drink.price;
		this.detail1 = drink.detail1;
		this.detail2 = drink.derail2;
    this.ingredients = drink.ingredients;
  }
}
