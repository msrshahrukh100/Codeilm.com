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
import FolderIcon from '@material-ui/icons/Folder';
import axios from '../../lovecodeaxios'

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
      tutorialId: tutorialId
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
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Container maxWidth="lg">
      <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
      <Paper className={classes.paper}>
      <h2 style={{fontSize: '3em'}}>12,343</h2>
      <Typography variant="h6" className={classes.title}>
      Post Views
      </Typography>
      <List>

      <ListItem>
      <ListItemAvatar>
      <Avatar>
      <FolderIcon />
      </Avatar>
      </ListItemAvatar>
      <ListItemText
      primary="Single-line item"
      secondary={true ? 'Secondary text' : null}
      />
      </ListItem>

      <ListItem>
      <ListItemAvatar>
      <Avatar>
      <FolderIcon />
      </Avatar>
      </ListItemAvatar>
      <ListItemText
      primary="Single-line item"
      secondary={true ? 'Secondary text' : null}
      />
      </ListItem>

      </List>

      </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
      <Paper className={classes.paper}>

      </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
      <Paper className={classes.paper}>xs=6 sm=3</Paper>
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
