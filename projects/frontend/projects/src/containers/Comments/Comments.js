import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../projects_axios';
import { withRouter } from 'react-router-dom'

const messages = [
  {
    id: 1,
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'Recipe to try',
    secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
    person: '/static/images/avatar/2.jpg',
  },
  {
    id: 4,
    primary: 'Yes!',
    secondary: 'I have the tickets to the ReactConf for this year.',
    person: '/static/images/avatar/3.jpg',
  },
  {
    id: 5,
    primary: "Doctor's Appointment",
    secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
    person: '/static/images/avatar/4.jpg',
  },
  {
    id: 6,
    primary: 'Discussion',
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 7,
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: '/static/images/avatar/1.jpg',
  },
];

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
    console.log(this.state);
    return (
      <React.Fragment>
      <Paper square className={classes.paper} elevation={0}>
      <List className={classes.list}>
      {Object.keys(comments).map((value, index) => (
        <React.Fragment key={value+index}>
        <ListSubheader className={classes.subheader}>{value}</ListSubheader>
        {comments[value].map(value => {
          const text = (<>
            <span style={{color: 'black'}}>{value.text}</span>
            <br/>
            <span>{new Date(value.updated_at).toLocaleTimeString("en-us", {hour: "numeric", minute: "numeric"})}</span>
            </>
          )
          return (
            <ListItem key={value.id}>
              <ListItemAvatar>
                <Avatar alt={value.user.full_name} src={value.user.user_profile_pic} />
              </ListItemAvatar>
            <ListItemText primary={<b>{value.user.full_name || value.user.username}</b>} secondary={text} />
            </ListItem>
          )
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
