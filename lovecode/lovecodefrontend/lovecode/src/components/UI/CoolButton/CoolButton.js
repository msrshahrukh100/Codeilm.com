import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: theme.spacing(7)
  },
  input: {
    display: 'none',
  },
}));

const coolButton = (props) => {
  const classes = useStyles();

  return (
    <Link to={props.link}>
      <Button variant="contained" color="primary" className={classes.button}>
        {props.text}
      </Button>
    </Link>
  )
}

export default coolButton
