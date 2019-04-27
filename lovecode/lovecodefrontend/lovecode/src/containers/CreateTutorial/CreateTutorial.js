import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { MdGrade } from 'react-icons/md';
import { IconContext } from "react-icons";
import getCookie from '../../utils/getCookie'

const styles = theme => ({
  textField: {
    width: '95%',
    margin: theme.spacing.unit
  },
  repoField: {
    minWidth: 120,
    margin: theme.spacing.unit
  },
  container: {
    position: 'absolute',
    top: '90px',
    width: '95%'
  },
  margin: {
    margin: theme.spacing.unit,
    textTransform: 'none'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  }
});

class CreateTutorial extends React.Component {

  state = {
    title: "",
    error: null,
    emptyError: false
  }

  titleUpdate = event => {
    this.setState({
      title: event.target.value
    })
  }

  getBranchName = (props) => {
    const query = new URLSearchParams( props.location.search );
    for ( let param of query.entries() ) {
      if (param[0] === 'branch_name') {
        return param[1];
      }
    }
    return null
  }

  createTutorial = () => {
    this.setState((prevState, props) => {
      return {loading: prevState.title === "" ? false: true, emptyError: prevState.title === "" ? true: false}
    })
    if(this.state.title !== "") {
      const csrftoken = getCookie('csrftoken');
      const { repoName } = this.props.match.params;
      const branchName = this.getBranchName(this.props)
      const postData = {
        title: this.state.title,
        branch_name: branchName,
        repo_name: repoName,
      };
      axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
      axios.post('/tutorials/create_or_get', postData)
      .then(response => {
        console.log(response.data);
        const data = response.data;
        if(data.created) {
          this.setState({loading: false})
          this.props.history.push("/tutorials/create/" + repoName + "/" + data.tutorial_data.id + "/" + data.tutorial_data.slug + "?branch_name=" + branchName)
        }

      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
        })
      })

    }
  }

  render() {
    const { classes } = this.props;
    const { repoName } = this.props.match.params;
    return (
      <>

      <div className={classes.container}>
      <>
        <TextField
          error={this.state.emptyError}
          id="outlined-name"
          label="Title of your story"
          value={this.state.title}
          onChange={this.titleUpdate}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <Fab
          variant="extended"
          onClick={this.createTutorial}
          disabled={this.state.loading}
          size="medium"
          color="primary"
          aria-label="Add"
          className={classes.margin}
        >
          <IconContext.Provider value={{ size: '2em' }}>
          <MdGrade className={classes.extendedIcon} />
          </IconContext.Provider>
          Create your Story
        </Fab>
        </>
        </div>
      </>
    )
  }
}

export default withErrorHandler(withStyles(styles)(withRouter(CreateTutorial)), axios, "circular")
