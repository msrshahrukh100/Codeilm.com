import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconList from '../IconList/IconList';
import sidelist from '../../../extras/SideList/SideList'
import { connect } from 'react-redux'

const SwipeableTemporaryDrawer = (props) => {
    const logout = {
        text: "Logout",
        icon: "LogOut",
        key:"logout123",
        link:"/logout"
      }

    let newSideList = sidelist
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

export default connect(matchStateToProps, null)(SwipeableTemporaryDrawer);
