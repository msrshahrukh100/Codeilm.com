import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation/Navigation'
import Dashboard from '../../containers/Dashboard/Dashboard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class Layout extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navigation />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Dashboard />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout);
