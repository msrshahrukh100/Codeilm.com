import React from 'react'
import DetailPageLayout from '../../components/UI/DetailPageLayout/DetailPageLayout'
import VerticalLinearStepper from '../../components/UI/VerticalLinearStepper/VerticalLinearStepper'
import TutorialPage from '../../components/TutorialPage/TutorialPage'
import Snackbar from '../../components/UI/Snackbar/Snackbar'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class LearnPreview extends React.Component {

  state = {
    activeStep: 0,
    dialogOpen: true
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

  handleClose = () => {
    this.setState({
      dialogOpen: false
    })
  }


  render() {
    const data = this.props.content
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
        { msg && msg.errorCode !== "INV_TAG"?
          <Snackbar open={true} type={msg.type} text={msg.text}/>
          : null }

        { msg && msg.errorCode === "INV_TAG" ?
          <Dialog
            open={this.state.dialogOpen}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            maxWidth="xl"
          >
            <DialogTitle id="alert-dialog-slide-title">Page tags not closed properly</DialogTitle>
            <DialogContent>
              Some of your content is not within the <b>[Page "Title"] .... [End]</b> tags
              <br/>
              <img src="https://codeilm.com/static/images/tagsmatch.png" width="100%" />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Got it
              </Button>
            </DialogActions>
          </Dialog>
            : null }

        </>

    )
  }

}

export default LearnPreview
