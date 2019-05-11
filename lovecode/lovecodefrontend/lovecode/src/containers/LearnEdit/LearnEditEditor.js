import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import CommitToGithub from '../CommitToGithub/CommitToGithub'
import getCookie from '../../utils/getCookie'
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import BranchChoose from '../BranchChoose/BranchChoose'
import { withRouter } from "react-router";
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  textField: {
    width: '95%',
    margin: theme.spacing.unit
  },
  repoField: {
    minWidth: 120,
    margin: theme.spacing.unit
  },
  container: {
    position: 'absolute',
    top: '90px',
    width: '95%'
  },
  chip: {
   margin: theme.spacing.unit,
 },
});

const learnEditEditor = (props) => {
  const { classes } = props;
  const { repoName } = props.match.params;

  return (
    <>
    <div className={classes.container}>
    {props.contentLoaded ?
      <>
      <TextField
        id="outlined-read-only-input"
        label="Repository"
        value={props.repoName}
        className={classes.repoField}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <BranchChoose onBranchChange={props.handleBranchChange} repoName={repoName} defaultBranch={props.branchName} />
      {props.dbData ?
        <Fab
        variant="extended"
        disabled={props.loading}
        onClick={props.publishUnpublishTut}
        size="medium"
        color="secondary"
        aria-label="publish"
        className={classes.margin}
        >
        {props.isPublished ? "Unpublish" : "Publish"}
        </Fab>
      : null}


      <TextField
      id="outlined-multiline-static"
      label="learn.md"
      multiline
      rows="20"
      value={props.editorContent}
      onChange={props.learnContentUpdate}
      className={classes.textField}
      margin="normal"
      autoFocus={true}
      spellCheck="false"
      disabled={props.loading}
      variant="outlined"
      />
      {props.showCommitPanel ?
        <>
        <TextField
        id="outlined-name"
        label="Commit message"
        value={props.commitMessage}
        onChange={props.commitMessageUpdate}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        />

        <CommitToGithub
        commitMessage={props.commitMessage}
        content={props.editorContent}
        branch={props.branchName}
        repoName={props.repoName}
        sha={props.sha}
        callback={props.fetchLearnContent}
        />
        </>
      : null}

      <Chip
       label={props.showCommitPanel ? "Hide commit panel" : "Want to commit it to GitHub"}
       onClick={props.toggleCommitPanel}
       className={classes.chip}
       variant="outlined"
     />
      </>
      
      : null}

      </div>
    </>
  )
}

export default withStyles(styles)(withRouter(learnEditEditor))