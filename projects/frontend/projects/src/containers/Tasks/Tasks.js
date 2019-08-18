import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import withStyles from '@material-ui/core/styles/withStyles';

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
});

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0
  },
  paper: {
    margin: theme.spacing(10),
  },
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
  list: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  render() {
    const { classes } = this.props;

    const handleToggle = value => () => {
      console.log("hello");
    };

    return (
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                  <List className={classes.root}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >

                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (

                          <ListItem
                            key={index}
                            role={undefined} dense button
                            className={classes.listitem} elevation={1}
                            onClick={handleToggle()}
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
                                checked={true}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': "labelId" }}
                                icon={<LaptopMacIcon className={classes.uncheckedIcon} />}
                                checkedIcon={<CheckCircleIcon className={classes.checkedIcon}/>}
                              />
                            </ListItemIcon>
                            <ListItemText

                              id={"labelId"}
                              primary={<span {...provided.dragHandleProps} className={classes.primary}>{item.content}</span>} secondary={<span className={classes.secondary}>Is cool</span>} />
                          </ListItem>

                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}

              </Droppable>
          </DragDropContext>

            </Paper>
          </Grid>
      </Grid>
    );

  }
}

export default withStyles(styles)(Tasks)
