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
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'

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
    emptyError: false,
    tutorials: null
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

  componentDidMount() {
    const { repoName } = this.props.match.params;
    const branchName = this.getBranchName(this.props);
    axios.get('/tutorials/?repo_name=' + repoName + "&branch_name=" + branchName + "&repo_create=true")
      .then(response => {
        this.setState({
          tutorials: response.data
        })

      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error,
          loading: false
        })
      })
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
        const data = response.data;
        if(data.created) {
          this.setState({loading: false})
          this.props.history.push("/tutorials/create/" + repoName + "/" + data.tutorial_data.id + "/" + data.tutorial_data.slug + "/" + branchName)
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
    const branchName = this.getBranchName(this.props)
    const tutorials = this.state.tutorials ?
    this.state.tutorials.results.map((tutorial, index) => {
      return <MediaCard
        key={tutorial.id}
        link={"/tutorials/create/" + repoName + "/" + tutorial.id + "/" + tutorial.slug + "/" + branchName}
        content=<TutorialInfo />
        title={tutorial.title} />
    })
     : null;
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
        <p className={classes.margin}>Tutorials with this branch and repo</p>
        {tutorials}
        </div>
      </>
    )
  }
}

export default withErrorHandler(withStyles(styles)(withRouter(CreateTutorial)), axios, "circular")
