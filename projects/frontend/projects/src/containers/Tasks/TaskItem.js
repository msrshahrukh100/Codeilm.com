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


const styles = theme => ({
  primary: {
    fontSize: '2.5rem',
    lineHeight: '3.9rem'
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
    margin: theme.spacing(3.6)
  },
  margin: {
    margin: theme.spacing()
  }
})


const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : "white",
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
      updatedAt: props.item.updated_at
    }
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
    this.setState({showEdit: value})
  }

  handleMenue = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenueClose = () => {
    this.setState({anchorEl: null})
  }

  handleTextChange = event => {
    console.log("changeing");
    this.setState({text: event.target.value})
  }

  render() {
    const { classes } = this.props;
    const { provided } = this.props;
    const { snapshot } = this.props;
    const { item } = this.props;

    return (
      <ListItem
        role={undefined} dense
        className={classes.listitem} elevation={2}
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
            <IconButton edge="end" aria-label="delete"
              style={this.state.showEdit ? null : {display: 'none'}}
              onClick={this.handleMenue}
              className={classes.iconbutton}
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
              <MenuItem onClick={this.handleMenueClose}>Delete</MenuItem>
            </Menu>
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
            margin="normal"
            style={this.state.editPanelShown ?  null : {display: 'none'}}
          />

          <Button
            variant="contained"
            onClick={this.editTask}
            size="small"
            color="primary"
            className={classes.margin}
            style={this.state.editPanelShown ?  null : {display: 'none'}}
            >
              Save
            </Button>

            <Button
              variant="contained"
              onClick={() => this.toggleEditPanel(false, true)}
              size="small"
              color="secondary"
              className={classes.margin}
              style={this.state.editPanelShown ?  null : {display: 'none'}}
              >
                Cancel
              </Button>

      </ListItem>
    )
  }
}

export default withStyles(styles)(TaskItem)
