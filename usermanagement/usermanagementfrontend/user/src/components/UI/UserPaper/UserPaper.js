import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import FollowUnfollow from '../../../containers/FollowUnfollow/FollowUnfollow'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  avatar: {
    height: theme.spacing(9),
    width: theme.spacing(9),
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(8),
      width: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(8),
      width: theme.spacing(8),
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
    fontSize: 18,
    cursor: 'pointer'
  },
  intro: {
    fontSize: 13,
    color: 'grey',
    cursor: 'pointer',
  }
});

class UserPaper extends React.Component {

  redirectToProfile = () => {
    this.props.history.push(`/u/${this.props.userId}/${this.props.userName}`)
  }

  render() {
    const { classes } = this.props;
    const label = (
      <p>
      <span className={classes.name} onClick={this.redirectToProfile}>
      {this.props.name}
      </span>
      <br/>
      <span className={classes.intro} onClick={this.redirectToProfile}>
      {this.props.intro}
      </span>
      <br/>
      {this.props.showFollowUnfollowButton ?
        <FollowUnfollow
        small={true}
        followingUserId={this.props.userId}
        connection={this.props.connection}
        />
        : null}
        </p>
      )
      return (
        <Grid item xs={12} lg={4} sm={6}>
        <Paper className={classes.userPaper}>
        <Chip
        avatar={<Avatar onClick={this.redirectToProfile} alt={this.props.name} className={classes.avatar} src={this.props.imageUrl} />}
        label={label}
        className={classes.chip}
        />
        </Paper>
        </Grid>
      )
  }
}

export default withStyles(styles)(withRouter(UserPaper));
