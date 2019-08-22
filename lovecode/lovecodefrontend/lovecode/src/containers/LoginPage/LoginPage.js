import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import { FaGithub } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    textAlign: 'center'
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(),
    textTransform: 'none'
  },
  extendedIcon: {
    marginRight: theme.spacing(),
  },
  para: {
    marginTop: theme.spacing(3),
  }
});

class LoginPage extends React.Component {

  componentDidMount() {
    this.props.auth()
  }

  render() {

    const { classes } = this.props;
    const next = this.props.history.location.search
    const githubLoginUrl = "https://codeilm.com/accounts/github/login" + next;
    const googleLoginUrl = "https://codeilm.com/accounts/google/login" + next;

    return (
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
      <img width="300" alt="Codeilm logo" src="https://codeilm.com/static/images/logo/codeilmbanner.png" />
      <Typography component="p" className={classes.para}>
      You must continue with your GitHub account
      </Typography>
      <form className={classes.form}>
      <Fab
      variant="extended"
      size="medium"
      color="primary"
      aria-label="Add"
      className={classes.margin}
      href={githubLoginUrl}
      >
      <IconContext.Provider value={{ size: '2em' }}>
      <FaGithub className={classes.extendedIcon} />
      </IconContext.Provider>
      Continue with GitHub
      </Fab>


      <Fab
      variant="extended"
      size="medium"
      color="secondary"
      aria-label="Add"
      className={classes.margin}
      href={googleLoginUrl}
      >
      <IconContext.Provider value={{ size: '1.5em' }}>
      <FaGoogle className={classes.extendedIcon} />
      </IconContext.Provider>
      Continue with Google
      </Fab>

      </form>
      </Paper>
      </main>
    );

  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const matchDispatchToProps = dispatch => {
  return {
    auth: () => dispatch(actionCreators.auth())
  }
}

export default withStyles(styles)(connect(null, matchDispatchToProps)(LoginPage));
