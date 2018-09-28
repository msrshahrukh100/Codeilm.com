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


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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

function UserInfo(props) {
  const { classes, events } = props;
  const commitsCounts = events.pushEvents ? events.pushEvents.map(item => item.payload.distinct_size).reduce((a, b) => a + b, 0) : 0
  const repoCounts = events.pushEvents ? [...new Set(events.pushEvents.map(item => item.repo.name))].length : 0
  const createCounts = events.createEvents ? events.createEvents.length : 0
  const repositoryCreateCount = events.createEvents ? events.createEvents.filter(item => item.payload.ref_type === 'repository').length : 0
  const branchCreateCount = events.createEvents ? events.createEvents.filter(item => item.payload.ref_type === 'branch').length : 0

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
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
  );
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
