import React from 'react'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'
import TutorialPage from '../../components/TutorialPage/TutorialPage'
import getParsedContent from '../../utils/getParsedContent'
import Snackbar from '../../components/UI/Snackbar/Snackbar'


class LearnPreview extends React.Component {

  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState(prevState => {
      return {activeStep: prevState.activeStep + 1}
    })
  };

  handleBack = () => {
    this.setState(prevState => {
      return {activeStep: prevState.activeStep - 1}
    })
  };

  handleReset = () => {
    this.setState({activeStep: 0})
  };

  setStep = (step) => {
    this.setState({activeStep: step})
  }


  render() {
    const { content } = this.props
    const data = getParsedContent(content)
    const steps = data ?
      data.data.map(tutorial => tutorial.title)
      : null;
    const currentPage = data ?
      data.data[this.state.activeStep]
      : null;
    const msg = data.msg ? data.msg : null;
    const leftContent = <TutorialPage page={currentPage} />
    const right = steps.length > 1 ? (<VerticalLinearStepper
      activeStep={this.state.activeStep}
      handleBack={this.handleBack}
      handleNext={this.handleNext}
      handleReset={this.handleReset}
      setStep={this.setStep}
      steps={steps} />) : null;

    return (
      <>
      <div style={{paddingTop: 70}}></div>
      <DetailPageLayout
        left={leftContent}
        right={right}
        />
        { msg ?
          <Snackbar open={true} type={msg.type} text={msg.text}/>
          : null }
        </>

    )
  }

}

export default LearnPreview
