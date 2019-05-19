import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '../../components/UI/Snackbar/Snackbar'
import CommitToGithub from '../CommitToGithub/CommitToGithub'
import getCookie from '../../utils/getCookie'
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import BranchChoose from '../BranchChoose/BranchChoose'
import { withRouter } from "react-router";
import Chip from '@material-ui/core/Chip';
import SimpleMDE from "react-simplemde-editor";
import "./easymde.min.css";
import ReactDOMServer from "react-dom/server";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


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
});

const learnEditEditor = (props) => {
  const { classes } = props;
  const { repoName } = props.match.params;
  const [openYtDialog, setOpenYtDialog] = useState({show: false, editor:null});
  const [ytId, setYtId] = useState("");


  return (
    <>

    <Dialog
      open={openYtDialog.show}
      onClose={() => setOpenYtDialog({show: false})}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Enter YouTube video id</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="YouTube video Id"
          value={ytId}
          onChange={element => setYtId(element.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenYtDialog({show: false})} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          console.log(ytId);
          const pos = openYtDialog.editor.codemirror.getCursor();
          openYtDialog.editor.codemirror.setSelection(pos, pos);
          openYtDialog.editor.codemirror.replaceSelection('\n[YOUTUBE](' + ytId + ')\n');
          setYtId("")
          setOpenYtDialog({show: false})
        }} color="primary">
          Save
        </Button>

      </DialogActions>
    </Dialog>

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
              setOpenYtDialog({show: true, editor: editor})
            },
            className: "fa fa-youtube-play",
            title: "Add YouTube video",
          },
          {
            name: "Add Page",
            action: function customFunction(editor){
              const pos = editor.codemirror.getCursor();
              editor.codemirror.setSelection(pos, pos);
              editor.codemirror.replaceSelection('\n[Page "Title of the Page"]\n\nYour awesome content\n\n[\\Page]\n');
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
