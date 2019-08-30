import React from 'react'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'
import Button from '@material-ui/core/Button';
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
        console.log(response.data);
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
            className={classes.textField}
            value={this.state.text}
            onChange={this.handleChangeText}
            margin="normal"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button variant="contained" onClick={this.createTask} size="small" color="primary" className={classes.margin}>
          Add
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(withRouter(AddTask));
