import React from 'react';
import logo from './logo.svg';
import './App.css';

const DRINKS = [
  ['manhattan', 'Manhattan'],
  ['martini', 'Martini'],
  ['longisland', 'Long Island Iced Tea'],
  ['bluelongisland', 'Blue Long Island'],
  ['oldfashioned', 'Old Fashioned']
]

const ID = 0;
const NAME = 1;

class fullPage extends React.Component {

}

class DrinkerApp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {order: []};
  }

  componentDidMount() {
    // Load Menu
    fetch('blackbird.json')
      .then(response => response.json())
      .then(menu => this.setState({ menu: menu }))
      .catch(e => console.log(e) );
  }

  getMenu() {
    if (!this.state.menu) {
      return null;
    } else {
      let menu = [];
      for (let drink of this.state.menu) {
        menu.push(
          <tr onClick={()=>this.drinkSelect(drink.id)}>
            <td>{drink.name}</td>
          </tr>
        );
      }
      return menu;
    }
  }

  placeOrder() {
    let order = this.state.order;
    order.push(this.state.selection);
    this.setState({order: order});
  }

  getOrders() {
    if (!this.state || !this.state.order) {
      return null;
    } else {
      let orders = [];
      console.log(this.state);
      for (let order of this.state.order) {
        orders.push(
          <tr>
            <td>{order.name}</td><td>${order.price}</td>
          </tr>
          );
      }
      return orders;
    }
  }

  drinkSelect(id) {
    for (let item of this.state.menu) {
      if (item.id === id) {
        this.setState({selection: item});
      }
    }
  }

  render() {
    return (
      <div className="Menu">
        <p>
          Select Drink
        </p>
        <table>
          {this.getMenu()}
        </table>
        <div className="button" onClick={()=>this.placeOrder()}>
          Order
        </div>

        <table>
          {this.getOrders()}
        </table>
      </div>
    );
  }
}

export default DrinkerApp;
