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
import ViewsPanel from '../../components/ViewsPanel/ViewsPanel'
import { MdTrendingUp, MdModeEdit } from "react-icons/md";
import Button from '@material-ui/core/Button';
import BasicMetaTags from '../../components/MetaTags/BasicMetaTags'
import ShareButton from '../ShareButton/ShareButton'
import Grid from '@material-ui/core/Grid';
import CoolButton from '../../components/UI/CoolButton/CoolButton'
import Chips from '../../components/UI/Chips/Chips'
import { Link } from 'react-router-dom'

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
    marginRight: theme.spacing(),
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
    const q = params.get('q');
    this.state = {
      tutorials: [],
      loading: true,
      error: null,
      pageNumber: null,
      count: 0,
      loading: true,
      q:q
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
  }

  fetchTutorials = () => {
    this.setState({loading: true})
    const url = this.state.pageNumber ?
      this.state.q ?
        `/tutorials/?page=${this.state.pageNumber}&q=${this.state.q}`
        : `/tutorials/?page=${this.state.pageNumber}`
    : this.state.q ? `/tutorials/?q=${this.state.q}` : "/tutorials";
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
          <ShareButton url={'https://codeilm.com/stories/' + tutorial.id + '/' + tutorial.slug} title={tutorial.title} />
          {tutorial.owner_is_authenticated_user ?
            <>
            <Button
            size="small"
            color="primary"
            className={classes.metricsButton}
            onClick={() => this.props.history.push('/metrics/' + tutorial.id + '/' + tutorial.slug )}>
            <MdTrendingUp className={classes.iconSmall} />
            </Button>
            <Button
            size="small"
            color="primary"
            className={classes.metricsButton}
            onClick={() => this.props.history.push(editUrl)}>
            <MdModeEdit className={classes.iconSmall} />
            </Button>
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
          onClick={() => this.props.history.push('/stories/' + tutorial.id + '/' + tutorial.slug)}
          actionButtons={actionButtons}
          title={tutorial.title} />
      })}
      </InfiniteScroll>
    )
    return (
      <>
        <BasicMetaTags
          title="Stories on Codeilm"
        />
        <Grid container spacing={0}>
          <Grid item xs={12} lg={9} sm={10}>
            {this.state.tutorials && this.state.tutorials.length != 0 ?
              storiesList
              : !this.state.loading ? (<>
              <p style={{fontSize: 20, margin: 30}}>Sorry we couldn't find any story with the search query
                <strong style={{fontSize: 30}}> {this.state.q}</strong>
              </p>
              <p style={{fontSize: 20, margin: 30}}>
                <Link to="/stories">
                  See all the stories
                </Link>
              </p>
            </>) : null
          }
          </Grid>
          <Grid item lg={3} sm={2}>
              <div className={classes.coolButton}>
              {this.state.loading ? null :
                <CoolButton text="Create" link="/create" />
              }
              </div>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withErrorHandler(withRouter(withStyles(styles)(TutorialList)), axios, "list")
