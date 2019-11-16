import React, { useState } from 'react';
import ReactDom from 'react-dom';
import * as Utility from './Utility.js';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import Badge from '@material-ui/core/Badge';

import Menu from './Menu.js';


const LOGIN     = 0;
const MENU      = 1;
const CART      = 2;
const SETTINGS  = 3;

const pages = ["Login", "Menu", "Cart", "Settings"];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  header: {
    backgroundColor: "lightGrey",
  },
  menu: {
    marginLeft: theme.spacing(1),
  }
}));

export default function Page() {
  const classes = useStyles();

  const [menu, setMenu] = useState(null);
  const [selection, setSelection] = useState(null);
  const [order, setOrder] = useState(new Utility.Order());
  const [page, setPage] = useState(MENU);

  if (!menu) {
    fetch('blackbird.json')
      .then(response => response.json())
      .then(menu => setMenu(menu.map(drink => new Utility.Drink(drink))))
      .catch(e => console.log(e) );
  }

  document.title = 'Blackbird Bar';

  const drinkSelect = id => {
    if (id === selection) {
      setSelection(null);
    } else {
      setSelection(id);
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Avatar alt="Blackbird Bar" src="../blackbird.png" variant="rounded" className={classes.avatar} />
          <Typography variant="h6" className={classes.title}>
            Blackbird Bar
          </Typography>
          <Tooltip title="Menu">
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setPage(MENU)}
            >
              <ListAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cart">
            <Badge badgeContent={order.orderCount()} color="secondary" overlap={"circle"}>
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="cart"
                onClick={() => setPage(CART)}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Badge>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="settings"
              onClick={() => setPage(SETTINGS)}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className={classes.header}>
        <Typography variant="h5">{pages[page]}</Typography>
      </AppBar>
    </Container>
  );
}
