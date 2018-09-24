import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation/Navigation'


const styles = () => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
});


class Layout extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navigation />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout);
