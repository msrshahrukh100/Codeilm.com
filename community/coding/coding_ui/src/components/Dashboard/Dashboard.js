import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import User from '../User/User'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class Dashboard extends React.Component {

  render() {
    const { classes } = this.props
    const users = this.props.githubUsersData ? this.props.githubUsersData.map(item => {
      if(item !== undefined) {
        return (
          <Grid key={item.login} item xs={12} sm={12} lg={3}>
            <Paper className={classes.paper}>
              <User userGithubData={item} />
            </Paper>
          </Grid>
        )
      }
      else {
        return null
      }

    }) : null
    return (
      <div className={classes.root}>
      <Grid container spacing={16}>
        {users}
      </Grid>
    </div>
    )
  }
}


export default withStyles(styles)(Dashboard)
