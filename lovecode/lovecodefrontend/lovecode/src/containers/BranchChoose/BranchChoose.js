import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import TextField from '@material-ui/core/TextField';
import { DEFAULT_LEARN_CONTENT } from '../../extras/Constants/Constants'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class LearnEdit extends React.Component {

  state = {
    branches: null,
    age: '',
    loading: true,
    error: null,
    labelWidth: 0,
  }

  componentDidMount() {

    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });

    axios.get('/repo/branches/' + this.props.repoName)
      .then(response => {
        console.log(response.data);
        this.setState({
          branches: response.data.data,
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
        ref={ref => {
          this.InputLabelRef = ref;
        }}
        htmlFor="outlined-age-native-simple"
        >
        Branch
        </InputLabel>
        <Select
        native
        value={this.state.age}
        onChange={this.handleChange('age')}
        input={
          <OutlinedInput
          name="branch"
          labelWidth={this.state.labelWidth}
          id="outlined-age-native-simple"
          />
        }
        >
        {this.state.branches ?
          this.state.branches.map(branch => <option key={"selectbranch_"+branch.name} value={branch.name}>{branch.name}</option>)
          : null
        }
          </Select>
          </FormControl>

      </>
    )
  }
}

export default withErrorHandler( withStyles(styles)(LearnEdit), axios)
