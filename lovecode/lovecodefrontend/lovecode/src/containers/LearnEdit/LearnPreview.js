import React from 'react'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'
import TutorialPage from '../../components/TutorialPage/TutorialPage'
import { MdClose } from "react-icons/md";

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



  getParsedContent = (text) => {


    let result = []

    while(text){
      let regex =/\[Page(.*)\]([\S\s]*?)\[\/Page\]/ig
      text = text.trim("\n\r")

      const match = regex.exec(text)
      let temp = {}


      if(match === undefined) {
        console.log("unable to parse")
      }

      text = text.slice(match[0].length,)
      let title = match[1].trim()
      title = title.slice(1,-1)
      temp.title = title
      temp.content = match[2]
      result.push(temp)
    }
    return {"data": result}
  }

  render() {
    const { content } = this.props
    const data = this.getParsedContent(content)
    const steps = data ?
      data.data.map(tutorial => tutorial.title)
      : null;
    const currentPage = data ?
      data.data[this.state.activeStep]
      : null;
    const leftContent = <TutorialPage page={currentPage} />

    return (
      <>
      <MdClose size={32} onClick={this.props.togglePreview} style={{margin: '10px', cursor: 'pointer'}} />
      <DetailPageLayout
        left={leftContent}
        right={<VerticalLinearStepper
          activeStep={this.state.activeStep}
          handleBack={this.handleBack}
          handleNext={this.handleNext}
          handleReset={this.handleReset}
          steps={steps} />}/>
        </>

    )
  }

}

export default LearnPreview
