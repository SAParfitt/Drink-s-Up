import React, { useState } from 'react';
import ReactDom from 'react-dom';
import * as Utility from './Utility.js';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default class Menu extends React.Component{

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

  render() {
    return null;
  }

  /*
  <List className={classes.root} subheader={<li />}>
    <ListItem button onClick={() => setOpen(!open)}>
      <ListItemText primary="Test" />
      {open ? <NavigateNextIcon /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <ListItemText primary="Info" />
        </ListItem>
      </List>
    </Collapse>
    <ListItem button onClick={handleClick}>
      <ListItemText primary="Inbox" />
      {open ? <NavigateNextIcon /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <ListItemText primary="Starred" />
        </ListItem>
      </List>
    </Collapse>
    <ListItem button onClick={handleClick}>
      <ListItemText primary="Line3" />
      {open ? <NavigateNextIcon /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <ListItemText primary="Starred" />
        </ListItem>
      </List>
    </Collapse>
  </List>
  */

}
