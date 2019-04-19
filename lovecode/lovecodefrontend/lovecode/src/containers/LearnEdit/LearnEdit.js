import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DEFAULT_LEARN_CONTENT } from '../../extras/Constants/Constants'
import BranchChoose from '../BranchChoose/BranchChoose'

const styles = theme => ({
  textField: {
    width: '95%',
    margin: theme.spacing.unit
  }
});



class LearnEdit extends React.Component {

  state = {
    content: null,
    loading: true,
    error: null,
  }

  componentDidMount() {
    const { repoName } = this.props.match.params;
    axios.get('/learn/content/' + repoName + "?branch_name=" + "master")
      .then(response => {
        {response.data.content ?
          this.setState({
            content: response.data.content,
            loading: false
          })

        : this.setState({
          content: DEFAULT_LEARN_CONTENT,
          loading: false
        })
      }

      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  render() {
    const { classes } = this.props;
    const { repoName } = this.props.match.params;
    return (
      <>
      {this.state.content ?
        <>
        <BranchChoose repoName={repoName} />
        <TextField
        id="outlined-multiline-static"
        label="learn.md"
        multiline
        rows="20"
        defaultValue={this.state.content}
        className={classes.textField}
        margin="normal"
        autoFocus={true}
        spellCheck="false"
        variant="outlined"
        />
        </>
        : null}
      </>
    )
  }
}

export default withErrorHandler(withStyles(styles)(LearnEdit), axios)
