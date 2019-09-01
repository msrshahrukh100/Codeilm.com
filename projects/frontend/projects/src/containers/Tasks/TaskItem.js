import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';



const styles = theme => ({
  primary: {
    fontSize: '2.5rem',
    lineHeight: '3.9rem',
    [theme.breakpoints.down('sm')]: {
      lineHeight: '2rem',
      fontSize: '2rem'
    },
  },
  checkedIcon: {
    fontSize: theme.spacing(4),
    color: 'green'
  },
  uncheckedIcon: {
    fontSize: theme.spacing(4),
  },
  editicon: {
    fontSize: theme.spacing(2.5),
  },
  textField: {
    margin: theme.spacing(3.6),
    width: theme.spacing(75),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(25),
      marginLeft: 0,
      marginRight: 0,
    },
  },
  margin: {
    margin: theme.spacing()
  },
  showHideEditIcon: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  listitem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  cancelbutton: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(0.5),
    }
  }

})


const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" : "white",
  ...draggableStyle
});

class TaskItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      done: props.done,
      showEdit: false,
      taskId: props.item.id,
      anchorEl: null,
      editPanelShown: false,
      text: props.item.text,
      previousText: props.item.text,
      updatedAt: props.item.updated_at,
      deleteDialogOpen: false
    }
  }

  deleteTask = () => {
    axios.delete(`/tasks/${this.state.taskId}`)
      .then(response => {
        this.props.refreshTasks()
      })
      .catch(error => {
        console.log(error);
      })
  }

  axiosUpdate = data => {
    this.setState({loading: true})
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.put(`/tasks/${this.state.taskId}`, data)
    .then(response => {
      this.setState({
        loading: false,
        text: response.data.text,
        done: response.data.done,
        updatedAt: response.data.updated_at
      })
    })
    .catch(error => {
      console.log(error);
    })

  }

  updateText = () => {
    if(this.state.text !== this.state.previousText) {
      if(this.state.text === "") {
        alert("Please fill a title for the task")
        return
      }

      const postData = {
        text: this.state.text
      }
      this.axiosUpdate(postData);

    }
    this.toggleEditPanel(false)
  }

  toggleEditPanel = (value, cancel=false) => {
    if(value) {
      this.handleMenueClose()
    }
    if(cancel) {
      this.setState({text: this.state.previousText})
    }
    this.setState({editPanelShown: value})
  }

  changeShowEditButton = value => {
    if(value && this.state.editPanelShown) {
      return
    }
    this.setState({showEdit: value})
  }

  handleMenue = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenueClose = () => {
    this.setState({anchorEl: null})
  }

  handleTextChange = event => {
    this.setState({text: event.target.value})
  }

  handleClickOpen = value => {
    this.setState({deleteDialogOpen: value})
  }

  handleDone = (event, checked) => {
    this.setState({done: checked}, () => this.axiosUpdate({text: this.state.text, done: checked}))
  }

  handleEnterKey = event => {
    if(event.key == 'Enter') {
      this.updateText()
    }
  }

  render() {
    const { classes } = this.props;
    const { provided } = this.props;
    const { snapshot } = this.props;
    const { item } = this.props;
    const showHideEditIcon = this.state.showEdit ? null : classes.showHideEditIcon

    return (<>
      <ListItem
        role={undefined} dense
        className={classes.listitem}
        onClick={this.handleToggle}
        ref={provided.innerRef}
        {...provided.draggableProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}
        onMouseEnter={() => this.changeShowEditButton(true)}
        onMouseLeave={() => this.changeShowEditButton(false)}
        >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={this.state.done}
            onChange={this.handleDone}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': "labelId" }}
            icon={<LaptopMacIcon className={classes.uncheckedIcon} />}
            checkedIcon={<CheckCircleIcon className={classes.checkedIcon}/>}
          />
        </ListItemIcon>

        <ListItemText
          id={"labelId"}
          style={this.state.editPanelShown ?  {display: 'none'} : null}
          primary={
            <>
            <span {...provided.dragHandleProps}
            className={classes.primary}>
              {this.state.text}
            </span>

            </>
          }
          secondary={<span className={classes.secondary}>{new Date(this.state.updatedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>}
          />
          <TextField
            id="standard-name"
            label="Task Title"
            className={classes.textField}
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleEnterKey}
            margin="normal"
            style={this.state.editPanelShown ?  null : {display: 'none'}}
          />
              <IconButton
                aria-label="delete"
                className={classes.cancelbutton}
                onClick={() => this.toggleEditPanel(false, true)}
                style={this.state.editPanelShown ?  null : {display: 'none'}}
                >
                <CloseIcon fontSize="medium" />
              </IconButton>

          <IconButton edge="end" aria-label="delete"
            onClick={this.handleMenue}
            className={clsx(classes.iconbutton, showHideEditIcon)}
            style={this.state.editPanelShown ? {display: 'none'} : null}
          >
            <EditIcon className={classes.editicon} />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenueClose}
          >
            <MenuItem onClick={() => this.toggleEditPanel(true)}>Edit</MenuItem>
            <MenuItem onClick={() => this.handleClickOpen(true)}>Delete</MenuItem>
          </Menu>



      </ListItem>

      <Dialog
        open={this.state.deleteDialogOpen}
        onClose={() => this.handleClickOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete the task "{this.state.text}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => this.handleClickOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteTask} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      </>
    )
  }
}

export default withStyles(styles)(TaskItem)
