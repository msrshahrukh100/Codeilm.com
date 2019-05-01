import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from "react-icons";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center'
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
    textTransform: 'none'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  para: {
    marginTop: theme.spacing.unit * 3,
  }
});

function LoginPage(props) {

  const { classes } = props;
  const next = props.history.location.search
  const loginUrl = "https://allywith.com/accounts/github/login" + next;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <img src="https://allywith.com/static/images/logo/logo-transparent.png" />
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
            href={loginUrl}
          >
            <IconContext.Provider value={{ size: '2em' }}>
            <FaGithub className={classes.extendedIcon} />
            </IconContext.Provider>
            Continue with GitHub
          </Fab>
        </form>
      </Paper>
    </main>
  );
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
