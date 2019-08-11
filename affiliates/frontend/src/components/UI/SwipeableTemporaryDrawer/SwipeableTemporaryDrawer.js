import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconList from '../IconList/IconList';
import sidelist from '../../../extras/SideList/SideList'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  chip: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(),
    backgroundColor: 'white'
  },
  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5)
  }
});

const SwipeableTemporaryDrawer = (props) => {
    const logout = {
        text: "Logout",
        icon: "LogOut",
        key:"logout123",
        link:"/logout"
      }

    let newSideList = sidelist
    const { classes } = props;
    const { user } = props;
    if(props.user !== null) {
      newSideList = newSideList.concat(logout);
    }
    return (
      <div>
        <SwipeableDrawer
          open={props.open}
          onClose={props.toggleDrawer(false)}
          onOpen={props.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={props.toggleDrawer(false)}
            onKeyDown={props.toggleDrawer(false)}
          >
          {props.user ?
              <div style={{textAlign: 'center'}} onClick={() => window.location = `/u/${user.id}/${user.username}`}>
                <Chip
                avatar={<Avatar alt={user.full_name} className={classes.avatar} src={user.user_profile_pic} />}
                label={user.full_name}
                className={classes.chip}
                />
                <hr/>
              </div>
             : null}
            <IconList listitems={newSideList} />
          </div>
        </SwipeableDrawer>
      </div>
    );

}

const matchStateToProps = state => {
  return {
    user: state.aReducer.user
  }
}

export default connect(matchStateToProps, null)(withStyles(styles)(SwipeableTemporaryDrawer));
