import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ShareIcon from '@material-ui/icons/Share';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../projects_axios';
import { withRouter } from "react-router";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';


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
});

class ProjectsDetail extends React.Component {

  state = {
    error: null,
    loading: false,
    title: null,
    poster: null,
    description: null,
    isPrivate: false
  }

  fetchProject = () => {
    const { projectId } = this.props.match.params;

    axios.get(projectId)
      .then(response => {
        const data = response.data;
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          poster: data.poster,
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
          <Chip className={classes.chip} color="secondary" label="Private" />
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

      <Typography variant="p" className={classes.users} component="p">
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

      <Typography variant="p" className={classes.users} component="p">
        Developers working on this project
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

      <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
      <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
      <ShareIcon />
      </IconButton>
      </CardActions>
      </Card>
    );
  }

}

export default withStyles(styles)(withRouter(ProjectsDetail))
