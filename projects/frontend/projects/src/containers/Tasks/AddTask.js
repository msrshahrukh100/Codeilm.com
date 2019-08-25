import React from 'react'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'


const styles = theme => ({

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

  createProject = () => {
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
    const { projectId } = this.props.projectId;

    if(projectId) {
      axios.put(`/${projectId}/tasks`, postData)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push(`/p/${response.data.id}`)
      })
      .catch(error => {
        console.log(error);
      })
    }
    else {
      axios.post("create/", postData)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push(`/p/${response.data.id}`)
      })
      .catch(error => {
        console.log(error);
      })
    }


  }

  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={this.state.text}
        onChange={this.handleChangeText}
        margin="normal"
      />
    )
  }
}

export default withStyles(styles)(AddTask);
