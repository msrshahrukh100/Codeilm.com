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


class UserPanel extends React.Component {

  state = {
    githubUsers: ['msrshahrukh100', 'ad-os', 'ageron', 'ahsankamal', 'ameenkhan07']
  }

  render() {
    const { classes } = this.props
    const users = this.state.githubUsers.map(user => {
      return (
        <Grid key={user} item xs={12} sm={6} lg={3}>
          <Paper className={classes.paper}>
            <User username={user} />
          </Paper>
        </Grid>
      )
    })
    return (
      <div className={classes.root}>
      <Grid container spacing={8}>
        {users}
      </Grid>
    </div>
    )
  }
}


export default withStyles(styles)(UserPanel)
