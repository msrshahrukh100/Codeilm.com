import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import getCookie from '../../utils/getCookie'
import axios from '../../projects_axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
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
  cancelbutton: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(0.1),
    }
  },
  listitem: {
    paddingLeft: 0,
    paddingRight: 0
  },
})


class CommentItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showEdit: false,
      commentId: props.value.id,
      anchorEl: null,
      editPanelShown: false,
      text: props.value.text,
      previousText: props.value.text,
      updatedAt: props.value.updated_at,
      deleteDialogOpen: false
    }
  }

  axiosUpdate = data => {
    this.setState({loading: true})
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.put(`/comments/${this.state.commentId}`, data)
    .then(response => {
      this.setState({
        loading: false,
        text: response.data.text,
        updatedAt: response.data.updated_at
      })
    })
    .catch(error => {
      console.log(error);
    })

  }

  deleteComment = () => {
    axios.delete(`/comments/${this.state.commentId}`)
      .then(response => {
        this.props.refreshComments()
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
    const showHideEditIcon = this.state.showEdit ? null : classes.showHideEditIcon
    const props = this.props;
    const text = (<>
      <span style={{color: 'black'}}>{this.state.text}</span>
      <br/>
      <span>{new Date(this.state.updatedAt).toLocaleTimeString("en-us", {hour: "numeric", minute: "numeric"})}</span>
      </>
    );
    return (
      <>
      <ListItem
        className={classes.listitem}
        onMouseEnter={() => this.changeShowEditButton(true)}
        onMouseLeave={() => this.changeShowEditButton(false)}
      >
        <ListItemAvatar>
          <Avatar alt={props.value.user.full_name} src={props.value.user.user_profile_pic} />
        </ListItemAvatar>
      <ListItemText
        style={this.state.editPanelShown ?  {display: 'none'} : null}
        primary={<>
          <b>{props.value.user.full_name || props.value.user.username}</b>
          </>
        }
        secondary={text}
      />
      <TextField
        id="standard-name"
        label="Comment"
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
        // style={}
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
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this comment "{this.state.text}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => this.handleClickOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteComment} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </>
    )
  }
}


export default withStyles(styles)(CommentItem)
