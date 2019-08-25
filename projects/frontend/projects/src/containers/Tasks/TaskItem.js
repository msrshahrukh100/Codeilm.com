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
    }
  }

  changeShowEdit = value => {
    console.log(this.state.taskId);
    this.setState({showEdit: value})
  }

  handleMenue = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenueClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const { classes } = this.props;
    const { provided } = this.props;
    const { snapshot } = this.props;
    const { item } = this.props;

    return (
      <ListItem
        role={undefined} dense button
        className={classes.listitem} elevation={1}
        onClick={this.handleToggle}
        ref={provided.innerRef}
        {...provided.draggableProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}
        onMouseEnter={() => this.changeShowEdit(true)}
        onMouseLeave={() => this.changeShowEdit(false)}
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
          primary={
            <>
            <span {...provided.dragHandleProps}
            className={classes.primary}>
              {item.text}
            </span>
            <IconButton edge="end" aria-label="delete"
              style={this.state.showEdit ? null : {display: 'none'}}
              onClick={this.handleMenue}
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
              <MenuItem onClick={this.handleMenueClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleMenueClose}>My account</MenuItem>
              <MenuItem onClick={this.handleMenueClose}>Logout</MenuItem>
            </Menu>
            </>
          }
          secondary={<span className={classes.secondary}>{new Date(item.updated_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>} />
      </ListItem>
    )
  }
}

export default withStyles(styles)(TaskItem)
