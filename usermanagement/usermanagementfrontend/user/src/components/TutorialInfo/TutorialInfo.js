import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  chip: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: 'white'
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 15
  },
  intro: {
    fontSize: 13,
    color: 'grey'
  }
});


const tutorialInfo = (props) => {
  const { classes } = props
  const label = props.user ? (
    <p><span className={classes.name}>{props.user.full_name}</span><br/><span className={classes.intro}>{props.user.intro}</span></p>
  ) : null
  return props.user ? (<Chip
        avatar={<Avatar className={classes.avatar} alt={props.user.full_name} src={props.user.user_profile_pic} />}
        label={label}
        className={classes.chip}
      />) : null
}


export default withStyles(styles)(tutorialInfo)
