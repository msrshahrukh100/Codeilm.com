import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class LearnEdit extends React.Component {

  state = {
    branches: null,
    age: '',
    error: null,
    defaultBranch: this.props.defaultBranch
  }

  componentDidMount() {

    axios.get('/repo/branches/' + this.props.repoName)
      .then(response => {
        this.setState({
          branches: response.data.data,
        })
      })
      .catch(error => {
        this.setState({
          error: error,
        })
      })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.defaultBranch !== this.props.defaultBranch) {
      this.setState({defaultBranch: this.props.defaultBranch})
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      {this.state.branches ?
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
        htmlFor="outlined-age-native-simple"
        >
        Branch
        </InputLabel>
        <Select
        native
        onChange={this.props.onBranchChange}
        value={this.state.defaultBranch}
        input={
          <OutlinedInput
          name="branch"
          labelWidth={51}
          id="outlined-age-native-simple"
          />
        }
        >
        {this.state.branches.map(branch => <option key={"selectbranch_"+branch.name} value={branch.name}>{branch.name}</option>)}
        </Select>
        </FormControl>

      : null}

      </>
    )
  }
}

export default withErrorHandler( withStyles(styles)(withRouter(LearnEdit)), axios)
