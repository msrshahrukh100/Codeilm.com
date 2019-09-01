import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../projects_axios';
import { withRouter } from 'react-router-dom'
import AddComment from './AddComment'
import CommentItem from './CommentItem'

const styles = theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class Comments extends React.Component {

  state = {
    comments: []
  }

  fetchComments = () => {
    const { projectId } = this.props.match.params;

    axios.get(`${projectId}/comments`)
      .then(response => {
        const data = response.data;
        this.setState({
          comments: this.groupComments(data)
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

  groupComments = comments => {
    let groupedComments = {}
    comments.map(value => {
      const curDate = new Date()
      const dateObj = new Date(value.updated_at)

      let groupString = ""
      if(dateObj.getDate() === curDate.getDate() &&
      dateObj.getMonth() === curDate.getMonth() &&
      dateObj.getFullYear() === curDate.getFullYear()) {
        groupString = "Today"
      }
      else {
        groupString = dateObj.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      }
      groupedComments[groupString] = groupedComments[groupString] || [];
      groupedComments[groupString].push(value);
    })
    return groupedComments;
  }

  componentDidMount() {
    this.fetchComments()
  }

  render() {
    const { classes } = this.props;
    const { comments } = this.state;
    return (
      <React.Fragment>
      <Paper square className={classes.paper} elevation={0}>
      <AddComment onCommentAdd={this.fetchComments} />
      <List className={classes.list}>
      {Object.keys(comments).map((value, index) => (
        <React.Fragment key={value+index}>
        <ListSubheader className={classes.subheader}>{value}</ListSubheader>
        {comments[value].map(value => {

          return <CommentItem key={value.id} value={value} refreshComments={this.fetchComments} />
        })}
        </React.Fragment>
      ))}
      </List>
      </Paper>
      </React.Fragment>
  )
}
}


export default withStyles(styles)(withRouter(Comments))
