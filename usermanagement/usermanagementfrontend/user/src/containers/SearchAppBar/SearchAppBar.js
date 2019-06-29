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
import { ThemeProvider } from '@material-ui/styles';
import blueGrey from '@material-ui/core/colors/blueGrey'
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga';

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
  avatar: {
    marginRight: theme.spacing(),
    height: 40,
    width: 40,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
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
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(6),
    },
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
    width: theme.spacing(18),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(14),
      marginLeft: theme.spacing(-3),
      paddingRight: theme.spacing()
    },
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(6),
    },
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

const resetTimeout = (id, newID) => {
	clearTimeout(id)
	return newID
}


class SearchAppBar extends React.Component {

  state = {
    drawerOpen: false,
    timeout: null
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  search = (value) => {
    ReactGA.event({
      category: 'User',
      action: `Performed Search ${value}`,
      label: 'PERFORMED_SEARCH',
    });
    window.location = "/stories/?q=" + value;
  }

  handleInput = event => {
    const value = event.target.value
    if(event.key == 'Enter') {
      this.search(value)
    }
  }

  handleChange = event => {
    const value = event.target.value
    this.setState((prevState, props) => {
      return {
        timeout: resetTimeout(prevState.timeout, setTimeout(() => this.search(value), 1000))
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div style={{color: 'white'}} className={classes.root}>

      <ThemeProvider theme={theme}>
        <AppBar elevation={1} position="static">
        <Toolbar>
        <Link to="/stories">
          <img alt="Codeilm.com logo" className={classes.appbarlogo} src="https://codeilm.com/static/images/logo/codeilmlogo.png" width="165" />
        </Link>

        <div className={classes.grow} />
        {this.props.user ?
          <Avatar alt={this.props.user.full_name} src={this.props.user.user_profile_pic} className={classes.avatar} />
          : null
        }
        <div className={classes.search}>
        <div className={classes.searchIcon}>
        <SearchIcon />
        </div>
        <InputBase
        placeholder="Search…"
        onKeyDown={this.handleInput}
        onChange={this.handleChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        />
        </div>
        </Toolbar>
        </AppBar>
      </ThemeProvider>

      </div>
    );

  }

}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const matchStateToProps = state => {
  return {
    user: state.aReducer.user
  }
}

export default withStyles(styles)(connect(matchStateToProps, null)(withRouter(SearchAppBar)));
