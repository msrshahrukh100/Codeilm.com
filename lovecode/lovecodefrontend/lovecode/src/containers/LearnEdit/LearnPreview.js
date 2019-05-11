import React from 'react'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'
import TutorialPage from '../../components/TutorialPage/TutorialPage'

class LearnPreview extends React.Component {

  state = {
    activeStep: 0
  }

  getParsedContent = (text) => {

    let regex =/\[Page(.*)\]([\S\s]*?)\[\/Page\]/ig
    let result = []

    while(text){
      text = text.trim("\n\r")

      const match = regex.exec(text)
      let temp = {}


      if(match === undefined) {
        console.log("unable to parse")
      }

      text = text.slice(match[0].length,)
      console.log(text)
      let title = match[1].trim().trim('"').trim("'")
      title = title.trim('""')
      console.log(title)
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
      <DetailPageLayout
        left={leftContent}
        right={<VerticalLinearStepper
          activeStep={this.state.activeStep}
          handleBack={this.handleBack}
          handleNext={this.handleNext}
          handleReset={this.handleReset}
          steps={steps} />}/>
    )
  }

}

export default LearnPreview
