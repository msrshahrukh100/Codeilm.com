import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Fab from '@material-ui/core/Fab';
import { MdGrade } from 'react-icons/md';
import { IconContext } from "react-icons";
import getCookie from '../../utils/getCookie'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'
import { connect } from 'react-redux'

const styles = theme => ({
  textField: {
    width: '95%',
    margin: theme.spacing()
  },
  repoField: {
    minWidth: 120,
    margin: theme.spacing()
  },
  container: {
    position: 'absolute',
    top: '90px',
    width: '95%'
  },
  margin: {
    margin: theme.spacing(),
    textTransform: 'none'
  },
  extendedIcon: {
    marginRight: theme.spacing(),
  }
});

class CreateTutorial extends React.Component {

  getBranchName = (props) => {
    const query = new URLSearchParams( props.location.search );
    for ( let param of query.entries() ) {
      if (param[0] === 'branch_name') {
        return param[1];
      }
    }
    return null
  }

  constructor(props) {

    super(props)
    const { repoName } = props.match.params;
    const branchName = this.getBranchName(props);

    this.state = {
      title: "",
      error: null,
      emptyError: false,
      tutorials: null,
      repoName: repoName,
      branchName: branchName
    }
  }

  titleUpdate = event => {
    this.setState({
      title: event.target.value,
      emptyError: event.target.value === "" ? true : false,
      error: null,
    })
  }

  componentDidMount() {

    if(this.state.repoName && this.state.branchName) {
      axios.get('/tutorials/?repo_name=' + this.state.repoName + "&branch_name=" + this.state.branchName + "&repo_create=true")
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
  }

  createTutorial = () => {
    this.setState((prevState, props) => {
      return {
        loading: prevState.title === "" ? false: true,
        emptyError: prevState.title === "" ? true: false,
        error: prevState.title === "" ? "Title can't be blank": null
      }
    })
    if(this.state.title !== "") {
      const csrftoken = getCookie('csrftoken');
      const { repoName } = this.props.match.params;
      const branchName = this.getBranchName(this.props)
      const postData = {
        title: this.state.title,
        branch_name: branchName,
        repo_name: repoName,
        repo_data: this.props.repoData
      };
      axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
      axios.post('/tutorials/create_or_get', postData)
      .then(response => {
        const data = response.data;
        if(data.created) {
          this.setState({loading: false})
          if(data.tutorial_data.repository_name) {
            this.props.history.push("/create/" + repoName + "/" + data.tutorial_data.id + "/" + data.tutorial_data.slug + "/" + branchName)
          }
          else {
            this.props.history.push("/create/new/" + data.tutorial_data.id + "/" + data.tutorial_data.slug)
          }
        }
        else {
          this.setState({loading: false, emptyError: true, error: "A story with this name already exists"})
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
        link={"/create/" + repoName + "/" + tutorial.id + "/" + tutorial.slug + "/" + branchName}
        content=<TutorialInfo user={tutorial.user} />
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
        <p style={{color: 'red', paddingLeft: '10px'}}>{this.state.error}</p>

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

        {tutorials ?
            tutorials.length > 0 ?
              <>
              <h4 className={classes.margin}>Stories with this branch and repo</h4>
              {tutorials}
              </>
              : null
        : null}

        </div>
      </>
    )
  }
}

const connectStateToProps = state => {
  return {
    repoData: state.rdReducer.repoData
  }
}

export default withErrorHandler(withStyles(styles)(withRouter(connect(connectStateToProps, null)(CreateTutorial))), axios, "circular")
