import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableTemporaryDrawer from '../SwipeableTemporaryDrawer/SwipeableTemporaryDrawer'
import { ThemeProvider } from '@material-ui/styles';
import blueGrey from '@material-ui/core/colors/blueGrey'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  },
});


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: 'black'
  },
  title: {
    display: 'none',
    fontSize: 25,
    color: 'black',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#f8bbd0', 0.15),
    '&:hover': {
      backgroundColor: fade('#f48fb1', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  appbarlogo: {
    width: theme.spacing(25),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  mobileLogo: {
    paddingTop: theme.spacing(2),
    display: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    },
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class SearchAppBar extends React.Component {

  state = {
    drawerOpen: false
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  render() {
    const { classes } = this.props
    return (
      <div style={{color: 'white'}} className={classes.root}>

      <ThemeProvider theme={theme}>
        <AppBar elevation={1} position="static">
        <Toolbar>
        <IconButton onClick={() => this.toggleDrawer(true)() } className={classes.menuButton} color="inherit" aria-label="Open drawer">
        <MenuIcon />
        </IconButton>

        <img className={classes.appbarlogo} src="https://codeilm.com/static/images/logo/codeilmlogo.png" width="165" />

        <div className={classes.grow} />
        <div className={classes.search}>
        <div className={classes.searchIcon}>
        <SearchIcon />
        </div>
        <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        />
        </div>
        </Toolbar>
        </AppBar>
      </ThemeProvider>


      <SwipeableTemporaryDrawer open={this.state.drawerOpen} toggleDrawer={this.toggleDrawer} />

      <img className={classes.mobileLogo} src="https://codeilm.com/static/images/logo/codeilmlogo.png"/>
      </div>
    );

  }

}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);
