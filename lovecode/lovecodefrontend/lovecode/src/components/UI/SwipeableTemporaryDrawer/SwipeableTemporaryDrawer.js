import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconList from '../IconList/IconList';
import sidelist from '../../../extras/SideList/SideList'

const SwipeableTemporaryDrawer = (props) => {
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
            <IconList listitems={sidelist} />
          </div>
        </SwipeableDrawer>
      </div>
    );

}

export default SwipeableTemporaryDrawer;
