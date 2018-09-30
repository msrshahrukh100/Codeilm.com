import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import UserInfo from './UserInfo/UserInfo'
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  root: {
    color: 'white',
  },
  paper: {
    color: 'white',
  }
});

class User extends React.Component {

  render() {
    const { classes } = this.props
    const { username, avatarURL, events, lastPushed } = this.props.userGithubData

    return (
      <div className={classes.row}>
        <CardHeader
            avatar={
              <Avatar
                src={avatarURL}
                className={classes.avatar}>
                {username[0]}
              </Avatar>
            }
            title={<h3>{username}</h3>}
            subheader={
              <Tooltip title="Last commit pushed on">
                <p>{lastPushed}</p>
              </Tooltip>
            }
          />
        <UserInfo username={username} events={events} />
      </div>
    )
  }
}

export default withStyles(styles)(User)
