import React from 'react'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

const styles = theme => ({
  textField: {
    margin: theme.spacing(2),
    // marginTop: theme.spacing(10),
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(),
      marginLeft: theme.spacing(5)
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(),
      marginLeft: theme.spacing(5)
    },
  },
  avatar: {
    marginBottom: theme.spacing(),
  },
  margin: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(2)
    },
  },
  container: {
    marginLeft: theme.spacing(0.18)
  }
})


class AddTask extends React.Component {

  state = {
    text: ""
  }

  handleChangeText = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleEnterKey = event => {
    if(event.key == 'Enter') {
      this.createComment()
    }
  }

  createComment = () => {
    if(this.state.text === "") {
      alert("Please fill some content for the comment")
      return
    }

    this.setState({loading: true})
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    const postData = {
      text: this.state.text,
    }
    const { projectId } = this.props.match.params;
    if(projectId) {
      axios.post(`/${projectId}/comments`, postData)
      .then(response => {
        this.setState({loading: false})
        this.props.onCommentAdd();
        this.setState({text: ""})
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container alignItems="flex-end" className={classes.container}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={this.props.user ? this.props.user.user_profile_pic : null} className={classes.avatar} />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="standard-name"
            label="Add a Comment"
            placeholder="Add a Comment, press Enter to Add"
            className={classes.textField}
            value={this.state.text}
            onChange={this.handleChangeText}
            onKeyDown={this.handleEnterKey}
            margin="normal"
          />
        </Grid>
      </Grid>
    )
  }
}

const matchStateToProps = state => {
  return {
    user: state.aReducer.user
  }
}

export default withStyles(styles)(withRouter(connect(matchStateToProps, null)(AddTask)));
