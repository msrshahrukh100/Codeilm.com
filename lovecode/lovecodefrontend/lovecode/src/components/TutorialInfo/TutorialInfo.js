import React from 'react'
import { FaPython } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  chip: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    backgroundColor: 'white'
  },
  avatar: {
    marginRight: -20,
    width: 40,
    height: 40,
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
  const label = <p><span className={classes.name}>{props.user.full_name}</span><br/><span className={classes.intro}>{props.user.intro}</span></p>
  return (<Chip
        avatar={<Avatar className={classes.avatar} alt={props.user.full_name} src={props.user.user_profile_pic} />}
        label={label}
        className={classes.chip}
      />)
}


export default withStyles(styles)(tutorialInfo)
