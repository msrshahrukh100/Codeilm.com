import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing(),
    marginRight: theme.spacing(),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
});

class VerticalLinearStepper extends React.Component {

  render() {
    const { classes } = this.props;
    const { steps } = this.props;

    return (
      <div className={classes.root}>
        <Stepper activeStep={this.props.activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel style={{cursor: 'pointer'}} onClick={() => this.props.setStep(index)}>{label}</StepLabel>
              <StepContent>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={this.props.activeStep === 0}
                      onClick={this.props.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.props.handleNext}
                      className={classes.button}
                    >
                      {this.props.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {this.props.activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>You went through all the steps!</Typography>
            <Button onClick={this.props.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
