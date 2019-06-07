import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'
import { withRouter } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component"
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import ListPageSkeleton from '../../components/UI/SkeletonLoaders/ListPageSkeleton'
import { withStyles } from '@material-ui/core/styles';
import LikeButton from '../LikeButton/LikeButton'
import NumberFormat from 'react-number-format';
import ViewsPanel from '../../components/ViewsPanel/ViewsPanel'
import { MdTrendingUp } from "react-icons/md";
import Button from '@material-ui/core/Button';
import BasicMetaTags from '../../components/MetaTags/BasicMetaTags'
import ShareButton from '../ShareButton/ShareButton'

const styles = theme => ({
  margin: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  metricsButton: {
    textTransform: 'none',
    marginLeft: theme.spacing()
  },
  iconSmall: {
    marginRight: theme.spacing(),
    fontSize: 20,
  }
});




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
    const { classes } = this.props;


    return (
      <>
        <BasicMetaTags
          title="Posts on Codeilm - Codeilm.com"
        />
        <InfiniteScroll
            dataLength={this.state.tutorials.length}
            next={this.fetchTutorials}
            hasMore={this.state.pageNumber}
            loader={<PageLayout><ListPageSkeleton /></PageLayout>}
        >
        {this.state.tutorials.map((tutorial, index) => {
          const actionButtons = (
            <>
            <LikeButton tutorial={tutorial}/>
            <ViewsPanel tutorial={tutorial} />
            <ShareButton url="https://codeilm.com" title={tutorial.title} />

            <Button
              size="small"
              color="primary"
              className={classes.metricsButton}
              onClick={() => this.props.history.push(this.props.match.path + '/metrics/' + tutorial.id + '/' + tutorial.slug )}>
              <MdTrendingUp className={classes.iconSmall} /> Metrics
            </Button>
            </>
          )
          const content = (<>
            <TutorialInfo user={tutorial.user} />
            </>)
          return <MediaCard
            headerVariant="h5"
            key={tutorial.id}
            link={'/tutorials/' + tutorial.id + '/' + tutorial.slug}
            content={content}
            actionButtons={actionButtons}
            title={tutorial.title} />
        })}
        </InfiniteScroll>
      </>
    )
  }
}

export default withErrorHandler(withRouter(withStyles(styles)(TutorialList)), axios, "list")
