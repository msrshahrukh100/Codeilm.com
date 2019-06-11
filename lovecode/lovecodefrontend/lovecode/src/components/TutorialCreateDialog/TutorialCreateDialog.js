import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import { FaRegPaperPlane } from "react-icons/fa";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function TutorialCreateDialog() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Link to="/create/github">
            <Paper className={classes.paper}>
              <IconContext.Provider value={{ size: '4em' }}>
                <FaGithub />
              </IconContext.Provider>
              <Typography gutterBottom variant="h5" component="h2">
                Create a story from a GitHub repository
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/create/github">
            <Paper className={classes.paper}>
              <IconContext.Provider value={{ size: '4em' }}>
                <FaRegPaperPlane />
              </IconContext.Provider>
              <Typography gutterBottom variant="h5" component="h2">
                Create a new story
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
