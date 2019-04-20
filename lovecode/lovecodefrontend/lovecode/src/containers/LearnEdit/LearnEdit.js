import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DEFAULT_LEARN_CONTENT } from '../../extras/Constants/Constants'
import BranchChoose from '../BranchChoose/BranchChoose'
import { withRouter } from "react-router";
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from "react-icons";


const styles = theme => ({
  textField: {
    width: '95%',
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
    let branchName = this.getBranchName(this.props);
    this.state = {
      content: null,
      branchName: branchName,
      repoName: repoName,
      error: null,
      defaultContent: false,
      commitMessage: "Updated learn.md"
    }
  }

  componentDidUpdate(prevProps) {
    let prevBranchName = this.getBranchName(prevProps);
    let newBranchName = this.getBranchName(this.props);

    if(prevBranchName !== newBranchName) {
      this.setState({branchName: newBranchName}, () => this.fetchLearnContent())
    }
  }

  commitFile = () => {
    axios.post('/commit/learn', {
      message: this.state.commitMessage,
      content: this.state.content,
      branch: this.state.branchName
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      this.setState({
        error: error,
      })
    })
  }

  learnContentUpdate = event => {
    this.setState({content: event.target.value})
  }
  commitMessageUpdate = event => {
    this.setState({commitMessage: event.target.value})
  }

  handleBranchChange = event => {
    this.props.history.push('/tutorials/create/' + this.state.repoName + '?branch_name=' + event.target.value);
  }

  fetchLearnContent = () => {
    axios.get('/learn/content/' + this.state.repoName + "?branch_name=" + this.state.branchName)
    .then(response => {

      this.setState({
        content: response.data.content ? response.data.content : DEFAULT_LEARN_CONTENT,
        defaultContent: response.data.content ? false : true
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
        {this.state.defaultContent ? <Snackbar show={true} type="success" text={"This branch doesn't have the learn.md file. You can start with this template"} /> : null}
      </div>
      <div className={classes.container}>
      {this.state.content ?
        <>
        <BranchChoose onBranchChange={this.handleBranchChange} repoName={repoName} defaultBranch={this.state.branchName} />
        <TextField
        id="outlined-multiline-static"
        label="learn.md"
        multiline
        rows="20"
        value={this.state.content}
        onChange={this.learnContentUpdate}
        className={classes.textField}
        margin="normal"
        autoFocus={true}
        spellCheck="false"
        variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Name"
          value={this.state.commitMessage}
          onChange={this.commitMessageUpdate}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Fab
          variant="extended"
          onClick={this.commitFile}
          size="medium"
          color="primary"
          aria-label="Add"
          className={classes.margin}
        >
          <IconContext.Provider value={{ size: '2em' }}>
          <FaGithub className={classes.extendedIcon} />
          </IconContext.Provider>
          Commit on GitHub
        </Fab>
        </>
        : null}
        </div>
      </>
    )
  }
}

export default withErrorHandler(withStyles(styles)(withRouter(LearnEdit)), axios, "circular")
