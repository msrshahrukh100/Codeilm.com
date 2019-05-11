import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { DEFAULT_LEARN_CONTENT } from '../../extras/Constants/Constants'
import { withRouter } from "react-router";
import getCookie from '../../utils/getCookie'
import LearnEditEditor from './LearnEditEditor'

const resetTimeout = (id, newID) => {
	clearTimeout(id)
	return newID
}

class LearnEdit extends React.Component {

  constructor(props) {

    super(props)
    const { repoName } = this.props.match.params;
    const { tutorialId } = this.props.match.params;
    const { branchName } = this.props.match.params;
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
      showCommitPanel: false
    }
  }

  toggleCommitPanel = () => {
    this.setState(prevState => {
      return { showCommitPanel: !prevState.showCommitPanel }
    })
  }

  saveLearnMd = () => {

    const csrftoken = getCookie('csrftoken');
    const postData = {
      branch_name: this.state.branchName,
      repo_name: this.state.repoName,
      content: this.state.editorContent
    };
    this.setState({loading: true})
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    axios.post('/tutorials/save', postData)
    .then(response => {
      this.setState({
        loading: false,
        dbData: response.data,
        isPublished: response.data ? response.data.is_published : false
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

  componentDidUpdate(prevProps) {
    const newBranchName = this.props.match.params.branchName;
    const prevBranchName = prevProps.match.params.branchName;

    if(prevBranchName !== newBranchName) {
      this.setState({branchName: newBranchName}, () => this.fetchLearnContent())
    }
  }

  learnContentUpdate = event => {
    const text = event.target.value;
    this.setState((prevState, props) => {
      return {
        editorContent: text,
        timeout: resetTimeout(prevState.timeout, setTimeout(this.saveLearnMd, 5000))
      }
    })
  }
  commitMessageUpdate = event => {
    this.setState({commitMessage: event.target.value})
  }

  handleBranchChange = event => {
    const { tutorialSlug } = this.props.match.params
    this.props.history.push('/tutorials/create/' + this.state.repoName + '/' + this.state.tutorialId + "/" + tutorialSlug + "/" + event.target.value);
  }

  fetchLearnContent = () => {
    this.setState({loading: true})
    axios.get('/learn/content/' + this.state.repoName + "?branch_name=" + this.state.branchName)
    .then(response => {
      this.setState({
        loading: false,
        editorContent: response.data.db_data ? response.data.db_data.learn_md_content ? response.data.db_data.learn_md_content : DEFAULT_LEARN_CONTENT : DEFAULT_LEARN_CONTENT,
        sha: response.data.sha,
        hasDefaultContent: response.data.db_data ? response.data.db_data.learn_md_content ? false : true : true,
        contentLoaded: true,
        dbData: response.data.db_data,
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
    return (
      <LearnEditEditor
        {...this.state}
        handleBranchChange={this.handleBranchChange}
        publishUnpublishTut={this.publishUnpublishTut}
        learnContentUpdate={this.learnContentUpdate}
        commitMessageUpdate={this.commitMessageUpdate}
        fetchLearnContent={this.fetchLearnContent}
        toggleCommitPanel={this.toggleCommitPanel}
        />
    )
  }
}

export default withErrorHandler(withRouter(LearnEdit), axios, "circular")
