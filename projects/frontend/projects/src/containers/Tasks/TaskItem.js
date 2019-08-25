import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'

const styles = theme => ({
  primary: {
    fontSize: '2rem'
  },
  checkedIcon: {
    fontSize: theme.spacing(4),
    color: 'green'
  },
  uncheckedIcon: {
    fontSize: theme.spacing(4),
  },
})


const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle
});

class TaskItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      done: props.done
    }
  }

  handleToggle = () => {

  }

  render() {
    const { classes } = this.props;
    const { provided } = this.props;
    const { snapshot } = this.props;

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
          primary={<span {...provided.dragHandleProps} className={classes.primary}>{this.props.item.text}</span>} secondary={<span className={classes.secondary}>Is cool</span>} />
      </ListItem>
    )
  }
}

export default withStyles(styles)(TaskItem)
