import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from '../../lovecodeaxios'
import NumberFormat from 'react-number-format';
import Map from '../../components/Map/Map'
import BasicMetaTags from '../../components/MetaTags/BasicMetaTags'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import ReactGA from 'react-ga';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
});

const ViewsPanel = (props) => {
  const { classes } = props;
  return (
    <Grid item xs={12} sm={4}>
    <Paper className={classes.paper}>
    <h2 style={{fontSize: '3em'}}>
    <NumberFormat
      value={props.data ? props.data.length : 0}
      displayType={'text'}
      thousandSeparator={true}
    />
    </h2>
    <Typography variant="h6" className={classes.title}>
      {props.title}
    </Typography>
    <List>
    {props.data ? props.data.slice(0,3).filter(item => item.user !== null).map((item, index) => {

      const avatarSrc = props.type === "POST_VIEWS" || props.type === "LIKES" ?
        item.user.user_profile_pic : item.user_profile_pic
      const primaryText = props.type === "POST_VIEWS" || props.type === "LIKES" ?
        item.user.full_name : item.full_name
      const secondaryText = props.type === "POST_VIEWS" || props.type === "LIKES" ?
        new Date(item.created_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : item.intro

      return (
        <ListItem key={index}>
        <ListItemAvatar>
        <Avatar alt={primaryText} src={avatarSrc} />
        </ListItemAvatar>
        <ListItemText
        primary={primaryText}
        secondary={secondaryText}
        />
        </ListItem>

      )
    })
  : null}
    </List>
    </Paper>
    </Grid>
  )

}

class TutorialMetrics extends React.Component {

  constructor(props) {
    super(props)

    const { tutorialId } = this.props.match.params;

    this.state = {
      tutorialId: tutorialId,
      allViews: [],
      distinctViews: [],
      likeData: [],
      loggedInViewData: []
    }
  }

  componentDidMount() {
    ReactGA.event({
      category: 'User',
      action: 'Visited metrics page',
      label: 'VISITED_METRICS_PAGE',
    });

    axios.get('/tutorials/' + this.state.tutorialId + '/metrics')
      .then(response => {
        if(response) {
          const data = response.data
          this.setState({
            loggedInViewData: data.logged_in_view_data,
            allViews: data.all_views,
            distinctViews: data.distinct_viewers,
            likeData: data.like_data
          })
        }

      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        })
      })



  }
  render() {
    const { classes } = this.props;
    const mapData = this.state.allViews ? this.state.allViews.filter(item => item.request_ip_info !== null).map(item => {
      return {
        city: item.request_ip_info.city,
        coordinates: [item.request_ip_info.longitude, item.request_ip_info.latitude]
      }
    }) : null;
    return (
      <div className={classes.root}>
      <BasicMetaTags
        title="Posts on Codeilm"
      />
      <Container maxWidth="lg">
      <Grid container spacing={3}>
        <ViewsPanel type="POST_VIEWS" data={this.state.loggedInViewData} title={this.state.loggedInViewData.length > 1 ? "Post Views" : "Post View"} {...this.props}/>
        <ViewsPanel type="DISTINCT_VIEWS" data={this.state.distinctViews} title={this.state.distinctViews.length > 1 ? "Distinct Views" : "Distinct View"} {...this.props}/>
        <ViewsPanel type="LIKES" data={this.state.likeData} title={this.state.likeData.length > 1 ? "Likes" : "Like"} {...this.props}/>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Your readers around the world
            </Typography>
            <br/>
            <Map mapData={mapData} />
          </Paper>
        </Grid>
      </Grid>
      </Container>
      </div>
    );
  }
}

TutorialMetrics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withErrorHandler(TutorialMetrics, axios, 'circular'));
