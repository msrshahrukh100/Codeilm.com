import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: '3.1875em'
  }
});

class EditIntro extends React.Component {

  state = {
    inputShown: false,
    intro: ""
  }

  toggleInput = () => {
      this.setState(prevState => ({
        inputShown: !prevState.inputShown
      }))
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.loading);
    return (
      <>
      {this.state.inputShown ? <>
        <TextField
        id="standard-name"
        label="About You"
        className={classes.textField}
        value={this.props.intro}
        onChange={this.props.handleIntroChange}
        margin="normal"
        />
        <br/>
        </>
        : null}
      <Button disabled={this.props.loading} onClick={this.state.inputShown ? this.props.handleIntroSave : this.toggleInput} size="small" className={classes.margin}>
        {this.state.inputShown ? "Save" : "Edit"}
      </Button>
      {this.state.inputShown ?
        <Button onClick={this.toggleInput} size="small" className={classes.margin}>
          Cancel
        </Button>
        : null}
      </>
    )
  }
}

export default withStyles(styles)(EditIntro);
