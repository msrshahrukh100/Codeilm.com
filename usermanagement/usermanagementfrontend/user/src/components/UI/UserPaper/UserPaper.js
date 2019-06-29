import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  avatar: {
    height: theme.spacing(7),
    width: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(5),
      width: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(7),
      width: theme.spacing(7),
    },
  },
  chip: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    fontSize: 17
  },
  userPaper: {
    height: 150,
  },
  name: {
    fontSize: 18
  },
  intro: {
    fontSize: 13,
    color: 'grey'
  }
});

const userPaper = props => {
  const { classes } = props;
  const label = (
    <p>
      <span className={classes.name}>
        {props.name}
      </span>
      <br/>
      <span className={classes.intro}>
        {props.intro}
      </span>
    </p>
  )
  return (
    <Grid item xs={12} lg={4} sm={6}>
      <Paper className={classes.userPaper}>
        <Chip
         avatar={<Avatar alt={props.name} className={classes.avatar} src={props.imageUrl} />}
         label={label}
         className={classes.chip}
       />
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(userPaper);
