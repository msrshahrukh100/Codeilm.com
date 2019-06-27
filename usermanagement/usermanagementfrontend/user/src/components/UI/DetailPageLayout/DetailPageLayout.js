import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
  },
});

function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={ props.right ? 8 : 12 }>
          <Paper elevation={0} className={classes.paper}>{props.left}</Paper>
        </Grid>
        { props.right ?
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} className={classes.paper}>{props.right}</Paper>
          </Grid>
          : null}
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);
