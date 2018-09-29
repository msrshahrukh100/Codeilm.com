import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Publish, DeviceHub } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Dialog from '../../UI/Dialog/Dialog'
import Button from '@material-ui/core/Button';
import moment from 'moment'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  clickable: {
    cursor: 'pointer',
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

class UserInfo extends React.Component {

  state = {
    dialogOpen: false,
  };

  handleClickOpen = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleClose = value => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes, events, username } = this.props;
    const commitsCounts = events.pushEvents ? events.pushEvents.map(item => item.payload.distinct_size).reduce((a, b) => a + b, 0) : 0
    const repo = events.pushEvents ? [...new Set(events.pushEvents.map(item => item.repo.name))] : null
    const repoCounts = repo ? repo.length : 0
    const createCounts = events.createEvents ? events.createEvents.length : 0
    const repositoryCreateCount = events.createEvents ? events.createEvents.filter(item => item.payload.ref_type === 'repository').length : 0
    const branchCreateCount = events.createEvents ? events.createEvents.filter(item => item.payload.ref_type === 'branch').length : 0
    const dialogData = events.pushEvents.map((item, index) => {
      return {
        id: index,
        primaryData: item.repo.name,
        secondaryData: String(item.payload.distinct_size) + " commits on " + moment(item.created_at).calendar()
      }
    })

    return (
      <div className={classes.root}>
        <Dialog
          title={username + "'s repositories"}
          dialogdata={dialogData}
          title={username + "'s repositories"}
          open={this.state.dialogOpen}
          onClose={this.handleClose}/>
        <List>
          <ListItem className={classes.clickable} onClick={this.handleClickOpen}>
            <Avatar className={classes.orangeAvatar}>
              <Publish />
            </Avatar>
            <ListItemText
              primary={"Pushed " + String(commitsCounts) + " commits"}
              secondary={repoCounts ? "To " + String(repoCounts) + " repositories" : null}/>
          </ListItem>
          <li>
            <Divider inset />
          </li>
          <ListItem>
            <Avatar className={classes.purpleAvatar}>
              <DeviceHub />
            </Avatar>
            <ListItemText
              primary={String(createCounts) + " create events"}
              secondary={repositoryCreateCount && branchCreateCount ? String(repositoryCreateCount) + " repositories & " + String(branchCreateCount) + " branch created" : null } />
          </ListItem>
        </List>
      </div>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
