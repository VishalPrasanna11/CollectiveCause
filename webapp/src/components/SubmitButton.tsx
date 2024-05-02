import React from 'react';
import Button from '@mui/material/Button';
import  {useSelector}  from 'react-redux';
import { useAppDispatch } from "../reducers/fundrasierslice";
import { submitFormDataAsync } from '../middlewares/fundrasisermiddleware';
import { RootState } from '../store/store';

const SubmitButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const formData = useSelector((state: RootState) => state.fundRaisingForm);

  const handleSubmit = async () => {
    try {
      console.log("Form Data",formData)
      // Dispatch async action to submit form data
      await dispatch(submitFormDataAsync(formData));
      console.log('Form submitted successfully!');
      // Optionally perform additional actions after form submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error if needed
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{
      marginRight: 1,
      textTransform: 'none',
      color: 'white',
      backgroundColor: '#478C5C',
      padding: '5px',
      width: '200px',
      borderRadius: '20px',
      '&:hover': {
        backgroundColor: '#316240', // Change background color on hover
      },
    }}>
      Submit
    </Button>
  );
};

export default SubmitButton;
