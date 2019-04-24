import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { withStyles } from '@material-ui/core/styles';
import CircularPreloader from '../../components/UI/SkeletonLoaders/CircularPreloader'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    textTransform: 'none'
  }
});

class CommitToGithub extends React.Component {
	state = {
		loading: false
	}

	render() {
		const { classes } = this.props;

		return (
		<div className={classes.wrapper}>
	        <Fab
	          variant="extended"
	          onClick={this.commitFile}
	          disabled={this.state.loading}
	          size="medium"
	          color="primary"
	          aria-label="Add"
	          className={classes.margin}
	        >
	          <IconContext.Provider value={{ size: '2em' }}>
	          <FaGithub className={classes.extendedIcon} />
	          </IconContext.Provider>
	          Commit on GitHub
	        </Fab>
	        {this.state.loading ? <CircularPreloader /> : null}
        </div>
		)
	}
}

export default withErrorHandler(withStyles(styles)(CommitToGithub), axios)