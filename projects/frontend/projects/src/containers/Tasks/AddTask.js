import React from 'react'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router";


const styles = theme => ({
  textField: {
    margin: theme.spacing(5),
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
  margin: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(2)
    },
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
      this.createTask()
    }
  }

  createTask = () => {
    if(this.state.text === "") {
      alert("Please fill a task title")
      return
    }

    this.setState({loading: true})
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    const postData = {
      text: this.state.text,
    }
    const { projectId } = this.props.match.params;
    console.log(projectId);
    if(projectId) {
      axios.post(`/${projectId}/tasks`, postData)
      .then(response => {
        this.setState({loading: false})
        this.props.onAddTask(response.data);
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
      <Grid container>
        <Grid item sm={6} xs={12}>
          <TextField
            id="standard-name"
            label="Add a Task"
            placeholder="Add a Task, press Enter to Add"
            className={classes.textField}
            value={this.state.text}
            onKeyDown={this.handleEnterKey}
            onChange={this.handleChangeText}
            margin="normal"
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(withRouter(AddTask));
