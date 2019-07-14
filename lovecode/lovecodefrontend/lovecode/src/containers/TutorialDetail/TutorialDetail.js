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
import getParsedContent from '../../utils/getParsedContent';
import ShareButton from '../ShareButton/ShareButton'
import LikeButton from '../LikeButton/LikeButton'
import ViewsPanel from '../../components/ViewsPanel/ViewsPanel'
import TutorialInfo from '../../components/TutorialInfo/TutorialInfo'
import ReactGA from 'react-ga';


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

    ReactGA.event({
      category: 'User',
      action: 'Clicked next button on story detail',
      label: 'NEXT_BUTTON_CLICKED',
    });

  };

  handleBack = () => {
    this.props.history.goBack()
    scroll.scrollToTop();

    ReactGA.event({
      category: 'User',
      action: 'Clicked back button on story detail',
      label: 'BACK_BUTTON_CLICKED',
    });

  };

  handleReset = () => {
    const nextStep = 0;
    this.props.history.push('/stories/' + this.state.tutorial.id + '/' + this.state.tutorial.slug + "/" + nextStep + "/" + this.state.slugs[nextStep])
    scroll.scrollToTop();

    ReactGA.event({
      category: 'User',
      action: 'Clicked reset button on story detail',
      label: 'RESET_BUTTON_CLICKED',
    });


  };


  componentDidMount() {
    const { tutorialId } = this.props.match.params

    axios.get('/tutorials/' + tutorialId)
      .then(response => {
        const parsedContent = getParsedContent(response.data.learn_md_content)
        this.setState({
          tutorial: response.data,
          parsedTutorial: parsedContent,
          slugs: parsedContent.data.map(item => Slug(item.title, {lower: true})).concat(["last"]),
        })
      })
      .catch(error => {
        this.setState({
          error: error,
        })
      })
  }


  render() {
    const steps = this.state.parsedTutorial ?
      this.state.parsedTutorial.data.map(tutorial => tutorial.title)
      : [];
    const currentPage = this.state.parsedTutorial ?
      this.state.parsedTutorial.data[this.state.activeStep]
      : null;
    const actionButtons = this.state.tutorial ? (
      <>
      <LikeButton tutorial={this.state.tutorial}/>
      <ViewsPanel tutorial={this.state.tutorial} />
      <ShareButton tutorial={this.state.tutorial} />
      </>
    ) : null
    const info = this.state.tutorial ? (<>
      <TutorialInfo user={this.state.tutorial.user} />
      </>) : null
    const lastPage = this.state.tutorial ? (
      <MediaCard
        onDetailPage={true}
        elevation={1}
        content={info}
        headerComponent="h2"
        actionButtons={actionButtons}
        title={this.state.tutorial.title} />
    ) : null

    const content = this.state.tutorial ?
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
        <TutorialPage lastPage={lastPage} page={currentPage} />
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

        {this.state.tutorial ?
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

export default withErrorHandler(withStyles(styles)(TutorialDetail), axios, "circular")
