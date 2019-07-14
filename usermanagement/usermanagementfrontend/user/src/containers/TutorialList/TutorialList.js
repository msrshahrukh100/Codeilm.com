import React from 'react'
import axios from '../../tutorial_axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'
import { withRouter } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component"
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import ListPageSkeleton from '../../components/UI/SkeletonLoaders/ListPageSkeleton'
import { withStyles } from '@material-ui/core/styles';
import LikeButton from '../LikeButton/LikeButton'
import ViewsPanel from '../../components/ViewsPanel/ViewsPanel'
import { MdTrendingUp, MdModeEdit } from "react-icons/md";
import Button from '@material-ui/core/Button';
import ShareButton from '../ShareButton/ShareButton'
import Grid from '@material-ui/core/Grid';
import Chips from '../../components/UI/Chips/Chips'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  margin: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  chips: {
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1.5)
  },
  metricsButton: {
    textTransform: 'none',
    marginLeft: theme.spacing()
  },
  iconSmall: {
    fontSize: 20,
  },
  coolButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(5)
  }
});




class TutorialList extends React.Component {

  constructor(props) {
    super(props)

    const params = new URLSearchParams(props.location.search);
    const { userId } = props.match.params;

    const q = params.get('q');
    this.state = {
      tutorials: [],
      loading: true,
      error: null,
      pageNumber: null,
      count: 0,
      loading: true,
      q:q,
      userId: userId
    }
  }

  componentDidUpdate(prevProps) {
    const prevParams = new URLSearchParams(prevProps.location.search);
    const prevq = prevParams.get('q');
    const params = new URLSearchParams(this.props.location.search);
    const q = params.get('q');

    if(prevq !== q) {
      this.setState({q: q, tutorials: []}, () => this.fetchTutorials())
    }

    const prevUserId = prevProps.match.params.userId;
    const userId = this.props.match.params.userId;
    if(prevUserId !== userId) {
      this.setState({userId: userId, tutorials: []}, () => this.fetchTutorials())
    }

  }

  fetchTutorials = () => {
    this.setState({loading: true})

    let url = this.state.pageNumber ?
      this.state.q ?
        `?page=${this.state.pageNumber}&q=${this.state.q}`
        : `?page=${this.state.pageNumber}`
    : this.state.q ? `?q=${this.state.q}` : `?temp=asdf`;

    url += `&user_id=${this.state.userId}&profile_view=true`
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
    const storiesList = (
      <InfiniteScroll
          dataLength={this.state.tutorials.length}
          next={this.fetchTutorials}
          hasMore={this.state.pageNumber}
          loader={<PageLayout><ListPageSkeleton /></PageLayout>}
      >
      {this.state.tutorials.map((tutorial, index) => {
        const editUrl = tutorial.repository_name ? `/create/${tutorial.repository_name}/${tutorial.id}/${tutorial.slug}/${tutorial.branch_name}`
        : `/create/new/${tutorial.id}/${tutorial.slug}`
        const actionButtons = (
          <>
          <LikeButton tutorial={tutorial}/>
          <ViewsPanel tutorial={tutorial} />
          <ShareButton url={'/stories/' + tutorial.id + '/' + tutorial.slug} title={tutorial.title} />
          {tutorial.owner_is_authenticated_user ?
            <>
            <Tooltip title="See Metrics" aria-label="See Metrics">
              <Button
              size="small"
              color="primary"
              className={classes.metricsButton}
              onClick={() => window.location = '/metrics/' + tutorial.id + '/' + tutorial.slug }>
              <MdTrendingUp className={classes.iconSmall} />
              </Button>
            </Tooltip>
            <Tooltip title="Edit" aria-label="Edit">
              <Button
              size="small"
              color="primary"
              className={classes.metricsButton}
              onClick={() => window.location = editUrl}>
              <MdModeEdit className={classes.iconSmall} />
              </Button>
            </Tooltip>
            </>
            : null
          }
          </>
        )
        const linkUrl = "/stories/?q="
        const content = (<>
          <div className={classes.chips}>
          {tutorial.tutorial_tags ? tutorial.tutorial_tags.map(tag => <Chips key={tag.id} link={linkUrl + tag.value} chipsData={{text: tag.label}} />) : null}
          </div>

          <TutorialInfo user={tutorial.user} />
          </>)
        return <MediaCard
          headerVariant="h5"
          key={tutorial.id}
          content={content}
          onClick={() => window.location = '/stories/' + tutorial.id + '/' + tutorial.slug}
          actionButtons={actionButtons}
          title={tutorial.title} />
      })}
      </InfiniteScroll>
    )
    return (
      <>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12} sm={12}>
            {this.state.tutorials && this.state.tutorials.length != 0 ?
              storiesList
              : !this.state.loading ? (<>
                {this.state.q ?
                  <p style={{fontSize: 20, margin: 30}}>Sorry we couldn't find any story with the search query
                  <strong style={{fontSize: 30}}> {this.state.q}</strong>
                  </p>

                  : this.props.myProfile ? (<>
                    <h2 style={{color: 'grey'}}>The world is yet to read your awesome story</h2>
                    <h4 style={{cursor: 'pointer'}} onClick={() => window.location = '/create'}>Create Now</h4>
                    </>
                ) : <h2 style={{color: 'grey'}}>The world is yet to read a story from {this.props.fullName}</h2>
              }
            </>) : null
          }
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withErrorHandler(withRouter(withStyles(styles)(TutorialList)), axios, "list")
