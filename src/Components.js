import React from 'react';
import './Components.css';

const uuidv4 = require('uuid/v4');

const DRINKS = [
  ['Manhattan', 12],
  ['Martini', 11],
  ['Long Island Iced Tea', 15],
  ['Blue Long Island', 34],
  ['Old Fashioned', 12]
]

export class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {order: null};
  }

  addToOrder(item) {


  }

  render() {
    return (
      <div class="page">
        <div class="column main">
          <Header/>
          <List/>
        </div>
        <div class="column nav">
          <Menu/>
        </div>
      </div>
    );
  }
}

export class Header extends React.Component {
  render() {
    return (
      <div class="header">
        Blackbird
      </div>
    );
  }
}

export class Menu extends React.Component {
  render() {
    let navItems = [];
    navItems.push(
      <div class="navitem">
        Settings
      </div>
    );
    navItems.push(
      <div class="navitem">
        Cart
      </div>
    );
    return navItems;
  }
}

export class List extends React.Component {
  render() {
    let table = (
      <table>
        <Item/>
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
      .then(menu => this.setState({ menu: menu }))
      .catch(e => console.log(e) );
  }

  drinkSelect(id){
    if (id === this.state.selection) {
      this.setState({selection: ''});
    } else {
      this.setState({selection: id});
    }
  }

  customizeDrink(id){

  }

  addDrink(id){
    console.log("Drink id: " + id);
    console.log("  Drink order id: " + uuidv4());
    let order = this.props.order;
  }

  render() {
    let menu = [];
    for (let drink of this.state.menu) {
      let selected = (drink.id === this.state.selection);
      menu.push(
        <tr class={selected ? 'selected' : ''} onClick={()=>this.drinkSelect(drink.id)}>
          <td>{drink.name}</td>
          <td>{drink.price}</td>
        </tr>
      );
      if (selected){
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
              <td onClick={()=>this.customizeDrink(drink.id)}>Customize</td>
              <td onClick={()=>this.addDrink(drink.id)}>Add Drink</td>
            </tr>
          </table>
        );
      }
    }
    return menu;
  }
}
