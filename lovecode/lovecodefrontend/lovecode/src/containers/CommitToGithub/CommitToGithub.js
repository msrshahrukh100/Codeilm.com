import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Fab from '@material-ui/core/Fab';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { withStyles } from '@material-ui/core/styles';
import CircularPreloader from '../../components/UI/SkeletonLoaders/CircularPreloader'
import getCookie from '../../utils/getCookie'
import Snackbar from '../../components/UI/Snackbar/Snackbar'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    textTransform: 'none'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  }
});

class CommitToGithub extends React.Component {

  state = {
    loading: false,
    commitedSuccessfully: false,
    error: null
  }

  commitFile = () => {
    this.setState({loading: true})
    console.log(this.state);
    const csrftoken = getCookie('csrftoken');
    const postData = {
      message: this.props.commitMessage,
      content: this.props.content,
      branch: this.props.branch,
      repo_name: this.props.repoName,
      sha: this.props.sha,
    };
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.post('/commit/learn', postData)
    .then(response => {
      console.log(response.status);
      if(response.status == 200) {
        this.setState({loading: false, commitedSuccessfully: true}, this.props.callback ?  () => setTimeout(() => this.props.callback(), 5000) : null)
      }
      else {
        this.setState({loading: false, error: response.data.message})
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({
        error: error,
      })
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ commitedSuccessfully: false, error: null });
  };

	render() {
		const { classes } = this.props;

		return (
      <>

      <Snackbar
      open={this.state.commitedSuccessfully}
      onCloseHandler={this.handleClose}
      type="success"
      text={"Successfully commited learn.md file to " + this.props.repoName + " to the branch " + this.props.branch }
      />

      <Snackbar
      open={this.state.error ? true : false}
      onCloseHandler={this.handleClose}
      type="error"
      text={this.state.error}
      />

      <div className={classes.wrapper}>
        <Fab
          variant="extended"
          onClick={this.commitFile}
          disabled={this.state.loading}
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
        {this.state.loading ? <CircularPreloader /> : null}
      </div>
      </>
		)
	}
}

export default withErrorHandler(withStyles(styles)(CommitToGithub), axios)
