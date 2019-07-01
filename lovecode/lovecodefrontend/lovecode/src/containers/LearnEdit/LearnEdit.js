import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { DEFAULT_LEARN_CONTENT } from '../../extras/Constants/Constants'
import { withRouter } from "react-router";
import getCookie from '../../utils/getCookie'
import LearnEditEditor from './LearnEditEditor'
import LearnPreview from "./LearnPreview"
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import getParsedContent from '../../utils/getParsedContent';
import BasicMetaTags from '../../components/MetaTags/BasicMetaTags'
import { animateScroll as scroll } from 'react-scroll'


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const resetTimeout = (id, newID) => {
	clearTimeout(id)
	return newID
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class LearnEdit extends React.Component {

  constructor(props) {

    super(props)
    const { repoName } = this.props.match.params;
    const { tutorialId } = this.props.match.params;
    const { branchName } = this.props.match.params;
		const { tutorialSlug } = this.props.match.params;

    this.state = {
      editorContent: "",
      branchName: branchName,
      repoName: repoName,
      tutorialId: tutorialId,
      error: null,
      hasDefaultContent: false,
      sha: null,
      commitMessage: "Updated learn.md",
      timeout: null,
      isPublished: false,
      dbData: null,
      loading: true,
      showCommitPanel: false,
			showPreview: false,
			tutorialSlug: tutorialSlug,
      tutorialData: "",
      tags: []
    }
  }

  toggleCommitPanel = () => {
    this.setState(prevState => {
      return { showCommitPanel: !prevState.showCommitPanel }
    })
    scroll.scrollToBottom();
  }

  saveLearnMd = () => {

    const csrftoken = getCookie('csrftoken');
    const postData = {
      tutorial_id: this.state.tutorialId,
      content: this.state.editorContent,
			tutorial_slug: this.state.tutorialSlug,
      tutorial_data: this.state.tutorialData,
      tags: this.state.tags
    };
    this.setState({loading: true})
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.post('/tutorials/save', postData)
    .then(response => {
      this.setState({
        loading: false,
        dbData: response.data,
        isPublished: response.data ? response.data.is_published : false,
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        loading: false,
        error: error
      })
    })

  }

  publishUnpublishTut = () => {
    if(this.state.dbData) {
      let putData = {
        id: this.state.dbData.id,
        is_published: !this.state.isPublished
      }
      this.setState({loading: true})
      axios.put('/tutorials/' + this.state.dbData.id + '/publish', putData)
      .then(response => {
        this.setState({isPublished: response.data.is_published, loading: false})
      })
      .catch(error => {
        this.setState({
          error: error,
        })
      })

    }
  }

	togglePreview = () => {
		this.setState(prevState => {
			return {showPreview: !prevState.showPreview}
		})
	}

  componentDidUpdate(prevProps) {
    const newBranchName = this.props.match.params.branchName;
    const prevBranchName = prevProps.match.params.branchName;

    if(prevBranchName !== newBranchName) {
      this.setState({branchName: newBranchName}, () => this.fetchLearnContent())
    }
  }

  learnContentUpdate = value => {
    this.setState((prevState, props) => {
      return {
        editorContent: value,
        timeout: resetTimeout(prevState.timeout, setTimeout(this.saveLearnMd, 5000))
      }
    })
  }

  handleDeleteStory = () => {
      axios.delete('/tutorials/' + this.state.tutorialId)
      .then(response => {
        console.log(response.data);
        this.props.history.push("/stories")
      })
      .catch(error => {
        this.setState({
          error: error,
        })
      })
  }

  commitMessageUpdate = event => {
    this.setState({commitMessage: event.target.value})
  }

  handleBranchChange = event => {
    const { tutorialSlug } = this.props.match.params
    this.props.history.push('/story/create/' + this.state.repoName + '/' + this.state.tutorialId + "/" + tutorialSlug + "/" + event.target.value);
  }

  setTags = value => {
    this.setState((prevState, props) => {
      return {
        tags: value,
        timeout: resetTimeout(prevState.timeout, setTimeout(this.saveLearnMd, 5000))
      }
    })
  }

  fetchLearnContent = () => {
    this.setState({loading: true})
    axios.get('/learn/content/' + this.state.tutorialId)
    .then(response => {
      const editorContent = response.data.db_data ? response.data.db_data.learn_md_content ? response.data.db_data.learn_md_content : DEFAULT_LEARN_CONTENT : DEFAULT_LEARN_CONTENT;
      this.setState({
        loading: false,
        editorContent: editorContent,
        tutorialData: getParsedContent(editorContent),
        sha: response.data.sha,
        hasDefaultContent: response.data.db_data ? response.data.db_data.learn_md_content ? false : true : true,
        contentLoaded: true,
        dbData: response.data.db_data,
        tags: response.data.db_data ? response.data.db_data.tutorial_tags : [],
				tutorialTitle: response.data.db_data.title,
        isPublished: response.data.db_data ? response.data.db_data.is_published : false
      })
    })
    .catch(error => {
      this.setState({
        error: error,
      })
    })

  }

  componentDidMount() {
    this.fetchLearnContent()
  }

  render() {
		const classes = this.props
    return (
			<>
      <BasicMetaTags title="Create your story" />
			<Dialog
				fullScreen
				open={this.state.showPreview}
				onClose={this.togglePreview}
				TransitionComponent={Transition}
			>
			<AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={this.togglePreview} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            {this.state.tutorialTitle}
          </Typography>
        </Toolbar>
      </AppBar>
				<LearnPreview  content={this.state.tutorialData}/>
			</Dialog>
				<LearnEditEditor
				{...this.state}
				handleBranchChange={this.handleBranchChange}
				publishUnpublishTut={this.publishUnpublishTut}
				learnContentUpdate={this.learnContentUpdate}
				commitMessageUpdate={this.commitMessageUpdate}
				fetchLearnContent={this.fetchLearnContent}
				toggleCommitPanel={this.toggleCommitPanel}
				togglePreview={this.togglePreview}
        handleDeleteStory={this.handleDeleteStory}
        setTags={this.setTags}
				/>

				</>
    )
  }
}

export default withErrorHandler(withRouter(withStyles(styles)(LearnEdit)), axios, "circular")
