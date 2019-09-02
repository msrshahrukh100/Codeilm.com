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
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'

const styles = theme => ({
  card: {
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing()
    },
  },
  title: {
      margin: theme.spacing(),
      marginBottom: theme.spacing(5),
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
    margin: theme.spacing(2)
  },
  persons: {
    marginTop: theme.spacing(5)
  },
  description: {
    whiteSpace: 'pre-line',
    marginTop: theme.spacing(5)
  },
  edit: {
    paddingLeft: theme.spacing(2)
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
    projectId: null,
  }

  fetchProject = () => {
    const { projectId } = this.props.match.params;

    axios.get(projectId)
      .then(response => {
        const data = response.data;
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
    const { projectId } = this.props.match.params;
    this.fetchProject();
    this.props.getMeta(projectId);
  }

  render() {
    const { classes } = this.props;
    const { poster } = this.state;
    const name = poster ? poster.full_name ? poster.full_name : poster.username : null
    return (

      <Grid container>
        <Grid item xs={12} sm={9}>

          <Card elevation={0} className={classes.card}>
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
            {this.props.isPoster ?
              <Link className={classes.edit} to={`/p/${this.state.projectId}/edit`}>
                Edit
              </Link>
              : null}
          <CardContent>
          <Typography variant="subtitle1" color="textPrimary" className={classes.description} component="p">
            {this.state.description}
          </Typography>
          </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} sm={3} className={classes.persons}>
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

        </Grid>
        {this.props.isPosterOrDeveloper ?
          <CardActions className={classes.cardaction}>
            <Button onClick={() => this.props.history.push(`/p/${this.state.projectId}/progress`)} variant="contained" size="large" color="primary" className={classes.margin}>
            See Project Progress and Tasks
            </Button>
          </CardActions>
          : null}


      </Grid>


    );
  }

}

const matchDispatchToProps = dispatch => {
  return {
    getMeta: projectId => dispatch(actionCreators.getProjectMetaData(projectId))
  }
}

const matchStateToProps = state => {
  return {
    ...state.pReducer
  }
}

export default withStyles(styles)(withRouter(withErrorHandler(connect(matchStateToProps, matchDispatchToProps)(ProjectsDetail), axios)))
