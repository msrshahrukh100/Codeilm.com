import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'
import { withRouter } from "react-router";
import {Helmet} from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component"
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import ListPageSkeleton from '../../components/UI/SkeletonLoaders/ListPageSkeleton'

class TutorialList extends React.Component {

  state = {
    tutorials: [],
    loading: true,
    error: null,
    pageNumber: null,
    count: 0
  }

  fetchTutorials = () => {
    const url = this.state.pageNumber ? '/tutorials/?page=' + this.state.pageNumber : "/tutorials"
    axios.get(url)
      .then(response => {
        console.log(response.data.results)
        this.setState(state => ({
          tutorials: state.tutorials.concat(response.data.results),
          loading: false,
          pageNumber: response.data.next_page_number,
          count: response.data.count
        }))
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error,
          loading: false
        })
      })
  }

  componentDidMount() {
    this.fetchTutorials()
  }

  render() {
    console.log(this.state);


    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tutorials on Allywith</title>
        </Helmet>
        <InfiniteScroll
            dataLength={this.state.tutorials.length}
            next={this.fetchTutorials}
            hasMore={this.state.pageNumber}
            loader={<PageLayout><ListPageSkeleton /></PageLayout>}
        >
        {this.state.tutorials.map((tutorial, index) => {
          return <MediaCard
            key={tutorial.id}
            link={this.props.match.path + '/' + tutorial.id + '/' + tutorial.slug}
            content=<TutorialInfo />
            title={tutorial.title} />
        })}
        </InfiniteScroll>
      </>
    )
  }
}

export default withErrorHandler(withRouter(TutorialList), axios, "list")
