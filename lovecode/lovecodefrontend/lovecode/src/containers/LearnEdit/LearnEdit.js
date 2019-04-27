import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DEFAULT_LEARN_CONTENT } from '../../extras/Constants/Constants'
import BranchChoose from '../BranchChoose/BranchChoose'
import { withRouter } from "react-router";
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import CommitToGithub from '../CommitToGithub/CommitToGithub'
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
});

const resetTimeout = (id, newID) => {
	clearTimeout(id)
	return newID
}

class LearnEdit extends React.Component {

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
    const { repoName } = this.props.match.params;
    const { tutorialId } = this.props.match.params;
    const branchName = this.getBranchName(this.props);
    this.state = {
      editorContent: "",
      branchName: branchName,
      repoName: repoName,
      tutorialId: tutorialId,
      error: null,
      hasDefaultContent: false,
      sha: null,
      commitMessage: "Updated learn.md",
      timeout: null
    }
  }


  saveLearnMd = () => {
    console.log("this  is cool, magic begins");
    console.log(this.state);

    const csrftoken = getCookie('csrftoken');
    const postData = {
      id: this.state.tutorialId,
      content: this.state.editorContent
    };
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.post('/tutorials/save', postData)
    .then(response => {
      console.log(response.data);
      const data = response.data;

    })
    .catch(error => {
      console.log(error);
      this.setState({
        error: error,
      })
    })

  }

  componentDidUpdate(prevProps) {
    let prevBranchName = this.getBranchName(prevProps);
    let newBranchName = this.getBranchName(this.props);

    if(prevBranchName !== newBranchName) {
      this.setState({branchName: newBranchName}, () => this.fetchLearnContent())
    }
  }

  learnContentUpdate = event => {
    const text = event.target.value;
    this.setState((prevState, props) => {
      return {
        editorContent: text,
        timeout: resetTimeout(prevState.timeout, setTimeout(this.saveLearnMd, 5000))
      }
    })
  }
  commitMessageUpdate = event => {
    this.setState({commitMessage: event.target.value})
  }

  handleBranchChange = event => {
    this.props.history.push('/tutorials/create/' + this.state.repoName + '?branch_name=' + event.target.value);
  }

  get_editorContent = (data) => {
    if (data.content_from_api === "" && data.content_from_db === "") {
      return DEFAULT_LEARN_CONTENT;
    }
    else if (data.content_from_api === "" && data.content_from_db !== "") {
      return data.content_from_db;
    }
    else if (data.content_from_api !== "" && data.content_from_db === "") {
      return data.content_from_api;
    }
  }

  fetchLearnContent = () => {
    axios.get('/learn/content/' + this.state.repoName + "?branch_name=" + this.state.branchName)
    .then(response => {
      console.log(response.data);
      this.setState({
        editorContent: response.data.content_from_api ? response.data.content_from_api : DEFAULT_LEARN_CONTENT,
        sha: response.data.sha,
        hasDefaultContent: response.data.content_from_api ? false : true,
        contentLoaded: true,
      })
    })
    .catch(error => {
      this.setState({
        error: error,
      })
    })

  }

  componentDidMount() {
    this.fetchLearnContent()
  }

  render() {
    const { classes } = this.props;
    const { repoName } = this.props.match.params;
    return (
      <>
      <div className={classes.snackbarDiv}>
        {this.state.hasDefaultContent ? <Snackbar show={true} type="success" text={"This branch doesn't have the learn.md file. You can start with this template"} /> : null}
      </div>
      <div className={classes.container}>
      {this.state.contentLoaded ?
        <>
        <TextField
          id="outlined-read-only-input"
          label="Repository"
          value={this.state.repoName}
          className={classes.repoField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <BranchChoose onBranchChange={this.handleBranchChange} repoName={repoName} defaultBranch={this.state.branchName} />
        <TextField
        id="outlined-multiline-static"
        label="learn.md"
        multiline
        rows="20"
        value={this.state.editorContent}
        onChange={this.learnContentUpdate}
        className={classes.textField}
        margin="normal"
        autoFocus={true}
        spellCheck="false"
        variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Commit message"
          value={this.state.commitMessage}
          onChange={this.commitMessageUpdate}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <CommitToGithub
          commitMessage={this.state.commitMessage}
          content={this.state.editorContent}
          branch={this.state.branchName}
          repoName={this.state.repoName}
          sha={this.state.sha}
          callback={this.fetchLearnContent}
         />
        </>
        : null}
        </div>
      </>
    )
  }
}

export default withErrorHandler(withStyles(styles)(withRouter(LearnEdit)), axios, "circular")
