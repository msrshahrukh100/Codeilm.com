import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearPreloader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
    <br />
      <LinearProgress variant="query" />
    </div>
  );
}

LinearPreloader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearPreloader);
