import React from 'react'
import axios from '../../lovecodeaxios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {Helmet} from "react-helmet"
import { List } from 'react-content-loader'
import PageLayout from '../../components/UI/PageLayout/PageLayout'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'

class TutorialDetail extends React.Component {

  state = {
    tutorial: null,
    loading: true,
    error: null,
    activeStep: 0
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };


  componentDidMount() {
    const { hash_id } = this.props.match.params
    axios.get('/tutorials/' + hash_id)
      .then(response => {
        this.setState({
          tutorial: response.data,
          loading: false
        })
      })
      .catch(error => {
        console.log(error)
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
    const content = this.state.tutorial ?
      (
        <>
          <h1>{title}</h1>
          <p>sadf</p>
        </>
      )
    : null;

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
