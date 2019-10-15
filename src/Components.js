import React from 'react';
import './Components.css';
import * as Utility from './Utility.js';

const LOGIN = 0;
const LIST  = 1;
const CUST  = 2;
const ORDER = 3;

export class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: new Utility.Order(),
      page: LIST
    };
  }

  addToOrder(item) {
    let order = this.state.order;
    order.add(item);
    this.setState({order: order});
  }

  removeFromOrder(item) {
    let order = this.state.order;
    order.remove(item);
    this.setState({order: order});
  }

  customizeDrink(drink) {
    /*
    for (let item of drink.ingredients) {
      console.log(item.name);
    }
    */
  }

  openCart() {
    console.log("cart");
    if (this.state.page === ORDER) {
        this.setState({page: LIST});
    } else {
      this.setState({page: ORDER});
    }
  }

  render() {
    let currPage = null;
    switch (this.state.page) {
      case LIST:
        currPage = (
          <List
            ato={drink=>this.addToOrder(drink)}
            rfo={drink=>this.removeFromOrder(drink)}
            cust={drink=>this.customizeDrink(drink)}
          />
        );
        break;
      case ORDER:
      currPage = (
        <Order
          ato={drink=>this.addToOrder(drink)}
          rfo={drink=>this.removeFromOrder(drink)}
          cust={drink=>this.customizeDrink(drink)}
          order={this.state.order}
        />
      );
      break;
    }
    return (
      <div className="page">
        <div className="column main">
          <Header/>
          {currPage}
        </div>
        <div className="column nav">
          <Menu
            count={this.state.order.itemList.length}
            cart={()=>this.openCart()}
            />
        </div>
      </div>
    );
  }
}

export class Header extends React.Component {
  render() {
    return (
      <div className="header">
        Blackbird
      </div>
    );
  }
}

export class Menu extends React.Component {
  render() {
    let navItems = [];
    navItems.push(
      <div className="navitem">
        Settings
      </div>
    );
    navItems.push(
      <div className="navitem" onClick={()=>this.props.cart()}>
        Cart {this.props.count}
      </div>
    );
    return navItems;
  }
}

export class List extends React.Component {
  render() {
    let table = (
      <table>
        <Item
          ato={this.props.ato}
          rfo={this.props.rfo}
          cust={this.props.cust}
        />
      </table>
    );
    return table;
  }
}

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selection: '', menu: []}
  }

  componentDidMount() {
    // Load Menu
    fetch('blackbird.json')
      .then(response => response.json())
      .then(menu => this.setState({ menu: menu.map(drink => new Utility.Drink(drink))}))
      .catch(e => console.log(e) );
  }

  drinkSelect(id){
    if (id === this.state.selection) {
      this.setState({selection: ''});
    } else {
      this.setState({selection: id});
    }
  }

  customizeDrink(drink){
    this.props.cust(drink);
  }

  addDrink(drink){
    this.props.ato(drink);
  }

  render() {
    let menu = [];
    for (let drink of this.state.menu) {
      let selected = (drink.id === this.state.selection);
      menu.push(
        <tr className={selected ? 'selected' : ''} onClick={()=>this.drinkSelect(drink.id)}>
          <td>{drink.name}</td>
          <td>{drink.price}</td>
        </tr>
      );
      if (selected) {
        if (drink.detail1) {
          menu.push(
            <table>
              <tr>
                <td>--></td>
                <td>{drink.detail1}</td>
              </tr>
            </table>
          );
        }
        menu.push(
          <table>
            <tr>
              <td>--></td>
              <td onClick={()=>this.customizeDrink(drink)}>Customize</td>
              <td onClick={()=>this.addDrink(drink)}>Add Drink</td>
            </tr>
          </table>
        );
      }
    }
    return menu;
  }
}

export class Order extends React.Component {

  componentDidMount() {
    // Load Menu
    fetch('blackbird.json')
      .then(response => response.json())
      .then(menu => this.setState({ menu: menu.map(drink => new Utility.Drink(drink))}))
      .catch(e => console.log(e) );
  }

  drinkSelect(id){
    if (id === this.state.selection) {
      this.setState({selection: ''});
    } else {
      this.setState({selection: id});
    }
  }

  customizeDrink(drink){
    this.props.cust(drink);
  }

  addDrink(drink){
    this.props.ato(drink);
  }

  removeDrink(drink){
    this.props.rfo(drink);
  }

  render() {
    let menu = [];
    for (let drink of this.props.order.fetchOrder()) {
      //let selected = (drink.id === this.state.selection);
      menu.push(
        //<tr class={selected ? 'selected' : ''} onClick={()=>this.drinkSelect(drink.id)}>
        <tr>
          <td>{drink.name}</td>
          <td>{drink.price}</td>
        </tr>
      );
      if (drink.detail1) {
        menu.push(
          <table>
            <tr>
              <td>--></td>
              <td>{drink.detail1}</td>
            </tr>
          </table>
        );
        menu.push(
          <table>
            <tr>
              <td>--></td>
              <td onClick={()=>this.customizeDrink(drink)}>Customize</td>
              <td onClick={()=>this.removeDrink(drink)}>Remove Drink</td>
            </tr>
          </table>
        );
      }
    }
    return menu;
  }
}
