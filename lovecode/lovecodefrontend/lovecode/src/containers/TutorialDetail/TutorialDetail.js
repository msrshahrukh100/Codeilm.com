import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'
import TutorialPage from '../../components/TutorialPage/TutorialPage'
import Slug from 'slug'
import { animateScroll as scroll } from 'react-scroll'
import BasicMetaTags from '../../components/MetaTags/BasicMetaTags'
import MediaCard from '../../components/UI/MediaCard/MediaCard'
import { withStyles } from '@material-ui/core/styles';

import ShareButton from '../ShareButton/ShareButton'
import LikeButton from '../LikeButton/LikeButton'
import ViewsPanel from '../../components/ViewsPanel/ViewsPanel'
import { MdTrendingUp } from "react-icons/md";
import Button from '@material-ui/core/Button';
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'

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

class TutorialDetail extends React.Component {

  constructor(props) {
    super(props)

    const { activeStep } = this.props.match.params;
    this.state = {
      tutorial: null,
      loading: true,
      error: null,
      slugs:null,
      activeStep: activeStep ? Number(activeStep) : 0
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if(this.props !== prevProps && prevState === this.state) {
      let activeStep = this.props.match.params.activeStep !== undefined ?
        Number(this.props.match.params.activeStep) : 0
      this.setState({
        activeStep: activeStep
      })
    }

  }

  setStep = (step) => {
    this.props.history.push('/stories/' + this.state.tutorial.id + '/' + this.state.tutorial.slug + "/" + step + "/" + this.state.slugs[step])
    scroll.scrollToTop();
  }

  handleNext = () => {
    const nextStep = this.state.activeStep + 1;
    this.props.history.push('/stories/' + this.state.tutorial.id + '/' + this.state.tutorial.slug + "/" + nextStep + "/" + this.state.slugs[nextStep])
    scroll.scrollToTop();
  };

  handleBack = () => {
    this.props.history.goBack()
    scroll.scrollToTop();
  };

  handleReset = () => {
    const nextStep = 0;
    this.props.history.push('/stories/' + this.state.tutorial.id + '/' + this.state.tutorial.slug + "/" + nextStep + "/" + this.state.slugs[nextStep])
    scroll.scrollToTop();
  };


  componentDidMount() {
    const { tutorialId } = this.props.match.params

    axios.get('/tutorials/' + tutorialId)
      .then(response => {
        console.log(response.data);
        this.setState({
          tutorial: response.data,
          slugs: response.data.tutorial_data.data.map(item => Slug(item.title, {lower: true})).concat(["thank-you"]),
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        })
      })
  }


  render() {
    const classes = this.props

    const steps = this.state.tutorial ?
      this.state.tutorial.tutorial_data.data.map(tutorial => tutorial.title)
      : [];
    const currentPage = this.state.tutorial ?
      this.state.tutorial.tutorial_data.data[this.state.activeStep]
      : null;
    // const actionButtons = this.state.tutorial ? (
    //   <>
    //   <LikeButton tutorial={this.state.tutorial}/>
    //   <ViewsPanel tutorial={this.state.tutorial} />
    //   <ShareButton tutorial={this.state.tutorial} />
    //
    //   <Button
    //     size="small"
    //     color="primary"
    //     className={classes.metricsButton}
    //     onClick={() => this.props.history.push('/stories/metrics/' + this.state.tutorial.id + '/' + this.state.tutorial.slug )}>
    //     <MdTrendingUp className={classes.iconSmall} /> Metrics
    //   </Button>
    //   </>
    // ) : null
    const info = this.state.tutorial ? (<>
      <TutorialInfo user={this.state.tutorial.user} />
      </>) : null
    const content = !this.state.loading ?
      <>
      <div style={this.state.activeStep !== 0 ? {display: 'none'} : null}>
      <MediaCard
        onDetailPage={true}
        elevation={1}
        content={info}
        headerComponent="h1"
        // actionButtons={actionButtons}
        title={this.state.tutorial.title} />
        </div>
        <TutorialPage page={currentPage} />
      </>
      : null
    const right = steps.length > 1 ? (<VerticalLinearStepper
      activeStep={this.state.activeStep}
      handleBack={this.handleBack}
      handleNext={this.handleNext}
      handleReset={this.handleReset}
      setStep={this.setStep}
      steps={steps} />) : null;

    const postTitle = this.state.tutorial ? this.state.tutorial.title : null
    return (
      <>
        <BasicMetaTags title={postTitle} />

        {!this.state.loading ?
          <DetailPageLayout
            left={content}
            right={right}
            />
          : null
        }
      </>
    )
  }
}

export default withErrorHandler(withStyles(styles)(TutorialDetail), axios)
