import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../projects_axios';
import { withRouter } from "react-router";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  card: {
    margin: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing()
    },
  },
  title: {
      margin: theme.spacing(),
      fontSize: '5.5rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem'
      },
  },
  chip: {
      margin: theme.spacing(),
  },
  users: {
      margin: theme.spacing(2),
      marginBottom: theme.spacing(0)
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardaction: {
    margin: theme.spacing()
  }
});

class ProjectsDetail extends React.Component {

  state = {
    error: null,
    loading: false,
    title: null,
    poster: null,
    description: null,
    isPrivate: false,
    developers: [],
    projectId: null
  }

  fetchProject = () => {
    const { projectId } = this.props.match.params;

    axios.get(projectId)
      .then(response => {
        const data = response.data;
        console.log(data);
        this.setState({
          projectId: data.id,
          title: data.title,
          description: data.description,
          poster: data.poster,
          developers: data.developers,
          isPrivate: data.is_private,
          deadline: new Date(data.deadline).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          createdAt: new Date(data.created_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
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

  componentDidMount() {
    this.fetchProject()
  }

  render() {
    console.log(this.state);
    const { classes } = this.props;
    const { poster } = this.state;
    const name = poster ? poster.full_name ? poster.full_name : poster.username : null
    return (

      <Card className={classes.card}>
      <Typography variant="h1" component="h1" className={classes.title} gutterBottom>
        {this.state.title}
      </Typography>

      {this.state.isPrivate ?
        <Tooltip title="This project is private" aria-label="add">
          <Chip variant="outlined" className={classes.chip} color="primary" label="Private" />
        </Tooltip>
        : null}
        <Tooltip title="Deadline for this project" aria-label="add">
          <Chip variant="outlined" className={classes.chip} color="primary" label={this.state.deadline} icon={<CalendarTodayIcon />}/>
        </Tooltip>
      <CardContent>
      <Typography variant="subtitle1" color="textPrimary" style={{whiteSpace: 'pre-line'}} component="p">
        {this.state.description}
      </Typography>
      </CardContent>

      <Typography color="textSecondary" variant="subtitle2" className={classes.users} component="p">
        This project is created by
      </Typography>
      <CardHeader
      avatar={
        <Avatar alt={name} src={poster ? poster.user_profile_pic : null} className={classes.avatar}>
        {name ? name[0] : ""}
        </Avatar>
      }
      title={name}
      subheader={this.state.createdAt}
      />

      <Typography color="textSecondary" variant="subtitle2" className={classes.users} component="p">
        Developers working on this project
      </Typography>

      {this.state.developers.length !== 0 ?
          this.state.developers.map((value, index) => (
            <CardHeader
              key={value.id}
              avatar={
                <Avatar alt={value.full_name ? value.full_name : value.username} src={value.user_profile_pic} className={classes.avatar}>
                  {value.full_name ? value.full_name : value.username}
                </Avatar>
              }
              title={value.full_name ? value.full_name : value.username}
              subheader={value.intro}
            />
          ))
        : (
          <Typography color="textPrimary" variant="subtitle2" className={classes.users} component="p">
            Currently no developers are working on this project
          </Typography>
        ) }

      <CardActions className={classes.cardaction}>
        <Button onClick={() => this.props.history.push(`/p/${this.state.projectId}/progress`)} variant="contained" size="large" color="primary" className={classes.margin}>
         See Project Progress and Tasks
       </Button>
      </CardActions>
      </Card>
    );
  }

}

export default withStyles(styles)(withRouter(ProjectsDetail))
