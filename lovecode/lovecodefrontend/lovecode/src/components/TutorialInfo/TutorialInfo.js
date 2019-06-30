import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  chip: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: 'white',
    '&:hover': {
       background: "white",
    },
    '&:focus': {
       background: "white",
    }
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


class TutorialInfo extends React.Component {

  userClicked = event => {
    event.stopPropagation();
    window.location = `/u/${this.props.user.id}/${this.props.user.username}`
  }

  render() {
    const { classes } = this.props
    const label = this.props.user ? (
      <p><span className={classes.name}>{this.props.user.full_name}</span><br/><span className={classes.intro}>{this.props.user.intro}</span></p>
    ) : null
    return this.props.user ? (<Chip
      avatar={<Avatar className={classes.avatar} alt={this.props.user.full_name} src={this.props.user.user_profile_pic} />}
      label={label}
      onClick={this.userClicked}
      className={classes.chip}
      />) : null
  }
}


export default withStyles(styles)(TutorialInfo)
