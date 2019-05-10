import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {Helmet} from "react-helmet"
import { List } from 'react-content-loader'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'
import TutorialPage from '../../components/TutorialPage/TutorialPage'
import Slug from 'slug'

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


  handleNext = () => {
    console.log(this.state);
    const nextStep = this.state.activeStep + 1;
    this.props.history.push('/tutorials/' + this.state.tutorial.id + '/' + this.state.tutorial.slug + "/" + nextStep + "/" + this.state.slugs[nextStep])
  };

  handleBack = () => {
    this.props.history.goBack()
  };

  handleReset = () => {
    const nextStep = 0;
    this.props.history.push('/tutorials/' + this.state.tutorial.id + '/' + this.state.tutorial.slug + "/" + nextStep + "/" + this.state.slugs[nextStep])
  };


  componentDidMount() {
    const { tutorialId } = this.props.match.params

    axios.get('/tutorials/' + tutorialId)
      .then(response => {
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
    const steps = this.state.tutorial ?
      this.state.tutorial.tutorial_data.data.map(tutorial => tutorial.title)
      : null;
    const title = steps ? steps[this.state.activeStep] : null
    const currentPage = this.state.tutorial ?
      this.state.tutorial.tutorial_data.data[this.state.activeStep]
      : null;
    const content = !this.state.loading ?
      <TutorialPage page={currentPage} />
      : null

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tutorial Detail</title>
        </Helmet>
        {!this.state.loading ?
          <DetailPageLayout
            left={content}
            right={<VerticalLinearStepper
              activeStep={this.state.activeStep}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              handleReset={this.handleReset}
              steps={steps} />}/>
          : null
        }
      </>
    )
  }
}

export default withErrorHandler(TutorialDetail, axios)
