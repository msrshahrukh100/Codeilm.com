import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import getCookie from '../../utils/getCookie'
import axios from '../../user_axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonSmall: {
    height: theme.spacing(1),
    width: theme.spacing(1),
    fontSize: theme.spacing(1.5)
  }
})

class OutlinedButtons extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      connection: props.connection,
      active: props.connection ? props.connection.active : false,
      loading: false
    }
  }

  handleClick = () => {
    this.setState({loading: true})
    const csrftoken = getCookie('csrftoken');
    const postData = {
      active: !this.state.active,
      following_user_id: this.props.followingUserId
    };
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.post('/users/follow-unfollow', postData)
    .then(response => {
      this.setState({
        loading: false,
        connection: response.data,
        active: response.data ? response.data.active : false
      })
    })

  }

  render() {
    const { classes } = this.props;
    const { connection } = this.props;
    console.log(this.props);
    return (
      <Button
        disabled={this.state.loading}
        onClick={this.handleClick}
        variant="outlined"
        color={this.props.small ? "primary" : "secondary"}
        className={this.props.small ? classes.buttonSmall : classes.button}>
      {this.state.active ? "Unfollow" : "Follow" }
      </Button>
    );
  }
}


export default withStyles(styles)(withErrorHandler(OutlinedButtons, axios, "blank"));
