import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import InfiniteScroll from "react-infinite-scroll-component"
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import ListPageSkeleton from '../../components/UI/SkeletonLoaders/ListPageSkeleton'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'

class RepoList extends React.Component {

  state = {
    userrepositories: [],
    links:{},
    pageNumber: 0,
    loading: true,
    hasMoreRepo: false,
    error: null
  }

  fetchRepositories = () => {
    axios.get('/userrepositories/' + this.state.pageNumber)
      .then(response => {
        if(response) {

          this.setState(state => ({
            userrepositories: state.userrepositories.concat(response.data.data),
            links: response.data.links,
            loading: false,
            hasMoreRepo: response.data.links.next ? true : false,
            pageNumber: response.data.links.next ? response.data.links.next : -1
          }))
        }

      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  componentDidMount() {
    this.fetchRepositories()
  }

  render() {
    return (
      <InfiniteScroll
          dataLength={this.state.userrepositories.length}
          next={this.fetchRepositories}
          hasMore={this.state.hasMoreRepo}
          loader={<PageLayout><ListPageSkeleton /></PageLayout>}
      >
      {this.state.userrepositories.map(repo => <MediaCard key={repo.id} onClick={() => this.props.setRepoData(repo)} link={'/tutorials/create/'+repo.name} search={"?branch_name="+repo.default_branch} title={repo.name} />)}
      </InfiniteScroll>
    )
  }
}

const matchDispatchToProps = dispatch => {
  return {
    setRepoData: data => dispatch(actionCreators.setRepoData(data))
  }
}

export default withErrorHandler(withRouter(connect(null, matchDispatchToProps)(RepoList)), axios, "list")
