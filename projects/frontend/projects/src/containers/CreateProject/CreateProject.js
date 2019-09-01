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
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'
import { connect } from 'react-redux'
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      [theme.breakpoints.up('sm')]: {
        width: '80%'
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

class CreateProject extends React.Component {

  state = {
    loading: false,
    title: "",
    description: "",
    deadline: new Date(),
    isPrivate: false,
    projectId: null,
    posterIsAuthenticatedUser: false,
    deleteDialogOpen: false,
  }

  fetchProject = projectId => {
    axios.get(projectId)
      .then(response => {
        const data = response.data;
        console.log(data);
        if(!(data.auth_user_is_developer || data.auth_user_is_poster)) {
          this.props.history.goBack();
        }
        else {
          this.setState({
            projectId: data.id,
            title: data.title,
            description: data.description,
            isPrivate: data.is_private,
            deadline: new Date(data.deadline),
          })
        }

      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  deleteProject = () => {
    const { projectId } = this.props.match.params;
    axios.delete(`/${projectId}`)
      .then(response => {
        this.props.history.goBack();
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    const { projectId } = this.props.match.params;
    if(projectId) {
      this.fetchProject(projectId)
    }
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
    const { projectId } = this.props.match.params;

    if(projectId) {
      axios.put(`/${projectId}/`, postData)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push(`/p/${response.data.id}`)
      })
      .catch(error => {
        console.log(error);
      })
    }
    else {
      axios.post("create/", postData)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push(`/p/${response.data.id}`)
      })
      .catch(error => {
        console.log(error);
      })
    }


  }

  handleClickOpen = value => {
    this.setState({deleteDialogOpen: value})
  }

  render() {
    const { classes } = this.props;
    const { projectId } = this.props.match.params;
    const badgeContent = (
      <p className={classes.badgeContent}>Private</p>
    )

    const title = (
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
          {this.state.isPrivate ?
            <div style={{paddingBottom: 30}}>
              <Tooltip title="This project is private" aria-label="add">
                <Chip variant="outlined" className={classes.chip} color="primary" label="Private" />
              </Tooltip>
            </div>
            : null}
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
            rows="10"
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

            <div>

            <Button disabled={this.state.loading} onClick={this.createProject} variant="contained" color="primary" className={classes.button}>
               {projectId ? "Update Project" : "Add Project"}
             <AddIcon className={classes.rightIcon} />
           </Button>
          {projectId ? (
            <Button
              disabled={this.state.loading}
              onClick={() => this.handleClickOpen(true)}
              variant="contained"
              color="secondary"
              className={classes.button}
              style={{marginLeft: 15}}>
              Delete this project
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          )
          : null}
           {projectId ?
               <a style={{cursor: 'pointer', margin: 30, position: 'absolute'}} onClick={() => this.props.history.goBack()}>Cancel</a>
              : null}
              </div>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={this.state.deleteDialogOpen}
        onClose={() => this.handleClickOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete the project "{this.state.title}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => this.handleClickOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteProject} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      </div>
    );
  }
}


export default withStyles(styles)(withRouter(CreateProject))
