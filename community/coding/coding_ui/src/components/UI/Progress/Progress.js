import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
  hide: {
    display: 'none'
  }
};

class Progress extends React.Component {
  timer = null;

  state = {
    completed: this.props.onRequestComplete ? 50 : 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  progress = () => {
    const { completed } = this.state;
    if (completed !== 100) {
      let diff = 10
      if(this.props.onRequestComplete) {
        diff = Math.random() * 50;
      }
      this.setState({ completed: Math.min(completed + diff, 100) },
        () => {
          if(this.state.completed === 100) {
            clearInterval(this.timer)
          }
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { completed } = this.state
    return (
      <div className={completed === 100 ? classes.hide : classes.root}>
        <LinearProgress variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);
