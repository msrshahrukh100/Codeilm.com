import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CommitToGithub from '../CommitToGithub/CommitToGithub'
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import BranchChoose from '../BranchChoose/BranchChoose'
import { withRouter } from "react-router";
import Chip from '@material-ui/core/Chip';
import SimpleMDE from "react-simplemde-editor";
import "./easymde.min.css";


const styles = theme => ({
  textField: {
    width: '100%',
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
 commitPanel: {
   marginTop: theme.spacing(2)
 }
});

const learnEditEditor = (props) => {
  const { classes } = props;
  const { repoName } = props.match.params;

  return (
    <>

    <div className={classes.container}>
    <>
    <SimpleMDE
    onChange={props.learnContentUpdate}
    value={props.editorContent}
    className={classes.textField}
    options={{
      autofocus: true,
      hideIcons: ["guide"],
      toolbar: ["bold", "italic", "heading", "|",
      {
        name: "Add YouTube video",
        action: function customFunction(editor){
          const pos = editor.codemirror.getCursor();
          editor.codemirror.setSelection(pos, pos);
          editor.codemirror.replaceSelection('\n[YOUTUBE](YouTube video Id)\n');
        },
        className: "fa fa-youtube-play",
        title: "Add YouTube video",
      },
      {
        name: "Add Page",
        action: function customFunction(editor){
          const pos = editor.codemirror.getCursor();
          editor.codemirror.setSelection(pos, pos);
          editor.codemirror.replaceSelection('\n[Page "Title of the Page"]\n\nYour awesome content\n\n[Page]\n');
        },
        className: "fa fa-file-text",
        title: "Add Page",
      },
      "|",
      {
        name: "Preview",
        action: function customFunction(editor){
          props.togglePreview()
        },
        className: "fa fa-eye",
        title: "Preview",
      }

    ],
  }}
  />

  {props.dbData ?
    <Fab
    variant="extended"
    disabled={props.loading}
    onClick={props.publishUnpublishTut}
    size="medium"
    color="secondary"
    aria-label="publish"
    className={classes.chip}
    >
    {props.isPublished ? "Unpublish" : "Publish"}
    </Fab>

    : null}


    {props.showCommitPanel && props.repoName ?
      <div className={classes.commitPanel}>
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
      </div>
      : null}
      {props.repoName ?
        <Chip
        label={props.showCommitPanel ? "Hide commit panel" : "Want to commit it to GitHub ?"}
        onClick={props.toggleCommitPanel}
        className={classes.chip}
        variant="outlined"
        />

        : null}
      </>

      </div>
    </>
  )
}

export default withStyles(styles)(withRouter(learnEditEditor))
