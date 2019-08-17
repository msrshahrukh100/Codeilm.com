import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { withRouter } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Badge from '@material-ui/core/Badge';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    },
  },
  badgeContent: {
    fontSize: '1rem',
    padding: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      padding: '0px',
      margin: '0px'
    },
  },
  container: {
    padding: theme.spacing(2),
  },
  textField: {
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  pagetitle: {
      margin: theme.spacing(),
      fontSize: '5.5rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem'
      },
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  pad: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  private: {
    paddingBottom: theme.spacing()
  },
});

class FullWidthGrid extends React.Component {

  state = {
    loading: false,
    title: "",
    description: "",
    deadline: new Date(),
    isPrivate: false
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange = date => {
    this.setState({
      deadline: date
    })
  }

  handlePrivateChange = event => {
    this.setState({
      isPrivate: event.target.checked
    })
  }

  createProject = () => {
    if(this.state.title === "") {
      alert("Please fill a title for the project")
      return
    }
    this.setState({loading: true})
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    const postData = {
      ...this.state,
      is_private: this.state.isPrivate
    }
    axios.post("create/", postData)
    .then(response => {
      this.setState({loading: false})
      this.props.history.push(`/p/${response.data.id}`)
    })
    .catch(error => {
      console.log(error);
    })

  }

  render() {
    const { classes } = this.props;
    const badgeContent = (
      <p className={classes.badgeContent}>Private</p>
    )

    const title = this.state.isPrivate ? (
      <Badge className={classes.margin} badgeContent={badgeContent} color="secondary">
        <Typography variant="h1" className={classes.pagetitle} component="h1" gutterBottom>
          {this.state.title ? this.state.title : "Add a New Project"}
        </Typography>
      </Badge>
    ) : (
      <Typography variant="h1" className={classes.pagetitle} component="h1" gutterBottom>
        {this.state.title ? this.state.title : "Add a New Project"}
      </Typography>
    )



    return (
      <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item xs={12}>

          <Paper elevation={0} className={classes.paper}>
          {title}
          <TextField
            id="outlined-name"
            label="Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            name="title"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rows="4"
            value={this.state.description}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            name="description"
          />
          <div className={classes.pad} >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
            margin="normal"
            id="time-picker"
            label="Deadline for this project"
            value={this.state.deadline}
            onChange={this.handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            />
            </MuiPickersUtilsProvider>
            </div>
            <div className={classes.private}>
              <FormControlLabel
                control={
                  <Switch checked={this.state.isPrivate} onChange={this.handlePrivateChange} />
                }
                label="This is a private project"
              />
            </div>

            <Button disabled={this.state.loading} onClick={this.createProject} variant="contained" color="primary" className={classes.button}>
               Add Project
             <AddIcon className={classes.rightIcon} />
           </Button>
          </Paper>
        </Grid>
      </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(withRouter(FullWidthGrid))
