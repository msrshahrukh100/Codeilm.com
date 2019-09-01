import React from 'react';
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
import getCookie from '../../utils/getCookie'
import Comments from '../Comments/Comments'
import Typography from '@material-ui/core/Typography';


const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "white" : "white",
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
      margin: theme.spacing(),
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  margin: {
    padding: theme.spacing(3)
  },
  commentsgrid: {
    margin: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1.75)
    }
  }
});

const resetTimeout = (id, newID) => {
	clearTimeout(id)
	return newID
}

class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      timeout: null,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result.map((value, index) => value.order = index);
    this.setState((prevState, props) => {
      return {
        timeout: resetTimeout(prevState.timeout, setTimeout(this.updateTaskOrder, 3000))
      }
    })
    return result;
  };

  updateTaskOrder = () => {
    const { projectId } = this.props.match.params;
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.put(`${projectId}/tasks/reorder`, this.state.tasks)
      .then(response => {
        const data = response.data;
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error,
          loading: false
        })
      })

  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const tasks = this.reorder(
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
      <>
      <Grid container>
          <Grid item xs={12}className={classes.commentsgrid}>

            {this.state.tasks.length === 0 ? <h2 className={classes.margin}>No tasks for project yet</h2> : null}
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
                            done={item.done}
                            refreshTasks={this.fetchTasks}
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

          </Grid>
      </Grid>

      <Grid container>
          <Grid item xs={12} className={classes.commentsgrid}>
            <Typography variant="h5" component="h5" className={classes.margin} gutterBottom>
               Comments
             </Typography>
              <Comments />
          </Grid>
        </Grid>
      </>
    );

  }
}

export default withStyles(styles)(Tasks)
