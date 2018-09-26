import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import axios from '../../Axios/githubAxios'
import MessageSnackbar from '../../components/UI/MessageSnackbar/MessageSnackbar'

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

class User extends React.Component {

  state = {
    githubData: null,
    error: null
  }

  componentDidMount() {
    axios.get(this.props.username + '/events')
      .then(response => {
        this.setState({
          githubData: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { classes } = this.props;
    const avatarURL = this.state.githubData ? this.state.githubData[0].actor.avatar_url : null
    if(this.state.githubData) {

      this.state.githubData.map(item => console.log(item.type))
    }
    const errorMessage = this.state.error ?
      <MessageSnackbar message={this.state.error} /> : null

    return (
      <div className={classes.row}>
        <CardHeader
            avatar={
              <Avatar
                src={avatarURL}
                className={classes.avatar}>
                {this.props.username[0]}
              </Avatar>
            }
            title={this.props.username}
            subheader="September 14, 2016"
          />
          {errorMessage}
      </div>
    )
  }
}

export default withStyles(styles)(User)
