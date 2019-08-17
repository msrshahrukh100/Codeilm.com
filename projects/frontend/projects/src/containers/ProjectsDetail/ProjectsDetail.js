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
import ShareIcon from '@material-ui/icons/Share';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../projects_axios';
import { withRouter } from "react-router";

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
        fontSize: '3rem'
      },
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
    description: null
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
      <CardHeader
      avatar={
        <Avatar alt={name} src={poster ? poster.user_profile_pic : null} className={classes.avatar}>
          {name ? name[0] : ""}
        </Avatar>
      }
      title={name}
      subheader={this.state.createdAt}
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
      This impressive paella is a perfect party dish and a fun meal to cook together with your
      guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Typography>
      </CardContent>
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
