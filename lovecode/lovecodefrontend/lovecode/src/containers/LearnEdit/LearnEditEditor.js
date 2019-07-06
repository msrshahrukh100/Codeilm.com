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
import { connect } from 'react-redux'
import TagsInput from '../../components/UI/TagsInput/TagsInput'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  textField: {
    width: '100%',
    margin: theme.spacing()
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'red'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  repoField: {
    minWidth: 120,
    margin: theme.spacing()
  },
  titleField: {
    minWidth: theme.spacing(40),
    margin: theme.spacing()
  },
  container: {
    position: 'absolute',
    top: '90px',
    width: '95%'
  },
  chip: {
   margin: theme.spacing(),
 },
 publishButton: {
  margin: theme.spacing(),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(1.5)
  },
},
 commitPanel: {
   marginTop: theme.spacing(2)
 }
});

const learnEditEditor = (props) => {
  const { classes } = props;
  const { repoName } = props.match.params;
  const [open, setOpen] = React.useState(false);

  let toolbar = ["bold", "italic", "heading", "|",
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
]
  if (props.repoName != "") {
    toolbar = toolbar.concat([
      "|",
      {
        name: "See it on GitHub",
        action: function customFunction(editor){
          const url = `https://github.com/${props.githubUsername}/${props.repoName}`
          window.open(url, '_blank')
        },
        className: "fa fa-github",
        title: "See it on GitHub",
      }
    ])
  }

  return (
    <>

    <div className={classes.container}>
    <>
    <TextField
    id="outlined-read-only-input"
    label="Title"
    value={props.dbData ? props.dbData.title : ""}
    className={classes.titleField}
    margin="normal"
    InputProps={{
      readOnly: true,
    }}
    variant="outlined"
    />

    {props.dbData ?
      <Fab
      variant="extended"
      disabled={props.loading}
      onClick={props.publishUnpublishTut}
      size="medium"
      color="secondary"
      aria-label="publish"
      className={classes.publishButton}
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
      toolbar: toolbar,
      spellChecker: false
  }}
  />
  <TagsInput setTags={props.setTags} tags={props.tags} />


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
        <br/>
        <Button onClick={() => setOpen(true)} variant="contained" color="secondary" className={classes.button}>
          Delete this story
          <DeleteIcon className={classes.rightIcon} />
        </Button>

        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete the story <b>"{props.dbData ? props.dbData.title : " this"}"</b> ? </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          "{props.dbData ? props.dbData.title : null}"<br/>
            This story will be permanently deleted. We are waiting for another awesome story from you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDeleteStory} variant="contained" color="secondary" className={classes.button}>
            Delete this story
            <DeleteIcon className={classes.rightIcon} />
          </Button>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </>
      </div>
    </>
  )
}

const matchStateToProps = state => {
  return {
    githubUsername: state.aReducer.user ? state.aReducer.user.github_username : null
  }
}

export default withStyles(styles)(withRouter(connect(matchStateToProps, null)(learnEditEditor)))
