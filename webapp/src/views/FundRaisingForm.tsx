import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stepper1 from '../components/FundRaisingStep1';
import Stepper2 from '../components/FundRaisingStep2';
import Stepper3 from '../components/FundRaisingStep3';
import SubmitButton from '../components/SubmitButton';



const steps: string[] = ['Basic Details', 'Benificary Details', 'Submit'];

// Define form components for each step
const forms: React.FC[] = [Stepper1,Stepper2,Stepper3];

const FundRasisingForm: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  return (
    <Box sx={{ width: '50%', margin: '20px auto' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
      {/* Render the form component for the active step */}
      {React.createElement(forms[activeStep])}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
       {activeStep === steps.length - 1 ? (
          <SubmitButton /> // Render SubmitButton on the last step
        ) : (
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        )}
      </Box>
      {activeStep === steps.length && (
        <Box sx={{ mt: 2 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </Box>
  );
};

export default FundRasisingForm;
