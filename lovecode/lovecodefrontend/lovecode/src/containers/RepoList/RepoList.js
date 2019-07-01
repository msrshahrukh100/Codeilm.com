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
import { GoRepoForked } from "react-icons/go";
import { GoStar } from "react-icons/go";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';




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
    axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}`;
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

  handleClick = repo => {
    this.props.setRepoData(repo)
    this.props.history.push({
      pathname: `/create/${repo.name}`,
      search: `?branch_name=${repo.default_branch}`
    })
  }

  render() {
    return (
      <InfiniteScroll
          dataLength={this.state.userrepositories.length}
          next={this.fetchRepositories}
          hasMore={this.state.hasMoreRepo}
          loader={<PageLayout><ListPageSkeleton /></PageLayout>}
      >
      {this.state.userrepositories.map(repo => {
        const content = (
          <div style={{paddingLeft: '13px'}}>
          <p>{repo.description}</p>
          {repo.stargazers_count ?
            <Chip
            style={{marginRight: '10px'}}
            size="small"
            avatar={
              <Avatar>
                <GoStar />
              </Avatar>
            }
            label={repo.stargazers_count > 1 ? repo.stargazers_count + " stars" : repo.stargazers_count + " star"}
            />

          : null}
          {repo.forks_count ?
            <Chip
            size="small"
            avatar={
              <Avatar>
                <GoRepoForked />
              </Avatar>
            }
            label={repo.forks_count > 1 ? repo.forks_count + " forks" : repo.forks_count + " fork"}
            />
            : null}
          </div>

        )
        return (
          <MediaCard
          key={repo.id}
          onClick={() => this.handleClick(repo)}
          title={repo.name}
          content={content}
          />
        )
      }

    )}
      </InfiniteScroll>
    )
  }
}

const matchDispatchToProps = dispatch => {
  return {
    setRepoData: data => dispatch(actionCreators.setRepoData(data))
  }
}

export default withErrorHandler(withRouter(connect(null, matchDispatchToProps)(RepoList)), axios, "circular")
