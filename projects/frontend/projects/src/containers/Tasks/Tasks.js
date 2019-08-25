import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../projects_axios';
import TaskItem from './TaskItem'
import AddTask from './AddTask'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};



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
    [theme.breakpoints.down('sm')]: {
      margin: '0px'
    },
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
      tasks: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const tasks = reorder(
      this.state.tasks,
      result.source.index,
      result.destination.index
    );
    this.setState({
      tasks: tasks
    });
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks = () => {
    const { projectId } = this.props.match.params;

    axios.get(`${projectId}/tasks`)
      .then(response => {
        const data = response.data;
        this.setState({
          tasks: response.data
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error,
          loading: false
        })
      })
  }


  appendToTasks = task => {
    this.setState(state => ({
          tasks: state.tasks.concat(task),
        }))
  }

  render() {
    const { classes } = this.props;
    const { projectId } = this.props.match.params;
    return (
      <Grid container>
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

                    {this.state.tasks.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <TaskItem
                            key={item.id}
                            item={item}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}

              </Droppable>
          </DragDropContext>

          <AddTask projectId={projectId} onAddTask={this.appendToTasks} />
            </Paper>
          </Grid>
      </Grid>
    );

  }
}

export default withStyles(styles)(Tasks)
