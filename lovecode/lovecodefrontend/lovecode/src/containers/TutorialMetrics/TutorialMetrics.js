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
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import axios from '../../lovecodeaxios'
import response from './temp'
import NumberFormat from 'react-number-format';

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

class TutorialMetrics extends React.Component {

  constructor(props) {
    super(props)

    const { tutorialId } = this.props.match.params;

    this.state = {
      tutorialId: tutorialId,
      allViews: null,
      distinctViews: null,
      likeData: null,
      loggedInViewData: null
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}`;
    axios.get('/tutorials/' + this.state.tutorialId + '/metrics')
      .then(response => {
        if(response) {

          console.log(response);
        }

      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        })
      })

    console.log(response);
    const data = response.data
    this.setState({
      loggedInViewData: data.logged_in_view_data,
      allViews: data.all_views,
      distinctViews: data.distinct_viewers,
      likeData: data.like_data
    })

  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Container maxWidth="lg">
      <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
      <Paper className={classes.paper}>
      <h2 style={{fontSize: '3em'}}>
      <NumberFormat
        value={this.state.loggedInViewData ? this.state.loggedInViewData.length : 0}
        displayType={'text'}
        thousandSeparator={true}
      />
      </h2>
      <Typography variant="h6" className={classes.title}>
      Post Views
      </Typography>
      <List>
      {this.state.loggedInViewData ? this.state.loggedInViewData.slice(0,3).map((item, index) => {
        return (
          <ListItem key={index}>
          <ListItemAvatar>
          <Avatar alt={item.user.full_name} src={item.user.user_profile_pic} />
          </ListItemAvatar>
          <ListItemText
          primary={item.user.full_name}
          secondary={item.created_at}
          />
          </ListItem>

        )
      })
    : null}


      </List>

      </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
      <Paper className={classes.paper}>
        <h2 style={{fontSize: '3em'}}>
          <NumberFormat
            value={this.state.distinctViews ? this.state.distinctViews.length : 0}
            displayType={'text'}
            thousandSeparator={true}
          />
        </h2>
        <Typography variant="h6" className={classes.title}>
        Distinct User Views
        </Typography>
      </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
      <Paper className={classes.paper}>
        <h2 style={{fontSize: '3em'}}>
          <NumberFormat
            value={this.state.likeData ? this.state.likeData.length : 0}
            displayType={'text'}
            thousandSeparator={true}
          />
        </h2>
        <Typography variant="h6" className={classes.title}>
        Likes
        </Typography>
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

export default withStyles(styles)(TutorialMetrics);
