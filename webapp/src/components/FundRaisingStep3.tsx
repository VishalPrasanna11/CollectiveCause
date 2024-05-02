import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl, Button, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MyTheme } from '../themes/theme1';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { updateField } from '../reducers/fundrasierslice'; // Ensure correct import path
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { describe } from 'node:test';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function FundRaisingStep3() {
  const { title, end_date, required_amount, image } = useSelector((state: RootState) => state.fundRaisingForm);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  // const [titleError, settitleError] = useState('');
  const [amountError, setamountError] = useState('');


  const handleFieldUpdate = (field: keyof RootState['fundRaisingForm'], value: string) => {
    // Specific validation for 'required_amount'
    if (field === 'required_amount') {
        if (!/^\d+$/.test(value)) {  // Simple numeric check
            setamountError('Enter numeric.');
        } else {
            setamountError('');
        }
    }

    // Dispatch update for all fields, moving dispatch outside the if block
    dispatch(updateField({ field, value }));
};
  const handleDateChange = (value: dayjs.Dayjs | null) => {
    if (value !== null) {
      const endDateString = value.format(); // Convert Dayjs to string format
      dispatch(updateField({ field: 'end_date', value: endDateString }));
    } else {
      dispatch(updateField({ field: 'end_date', value: '' }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String: string = reader.result?.toString() ?? ''; // Use ?? to provide a default value ('')
        dispatch(updateField({ field: 'image', value: base64String }));
        setSnackbarOpen(true); // Show snackbar on successful upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  React.useEffect(() => {
    console.log('Title:', title);
    console.log('Image String:',image);
    console.log('Amount:', required_amount);
    console.log('Date',end_date );
  }, [title,image , required_amount, end_date]);
  return (
    <ThemeProvider theme={MyTheme}>
      <Box sx={{ position: 'relative', margin: '20px auto', width: '500px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.2)' }}>
        <Box display="flex" flexDirection="row" gap={2} alignItems="center" justifyContent="center" marginLeft={3}>
          <Typography variant="h6">I need to raise</Typography>
          <TextField
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{ borderBottom: '1px solid #000', width: '100px' }}
            value={required_amount}
            onChange={(e) => handleFieldUpdate('required_amount', e.target.value)}
            error={!!amountError}
            helperText={amountError}
          />
          <Typography>USD,</Typography>
        </Box>

        <FormControl sx={{ margin: '10px 50px 10px 30px', width: '85%' }}>
          <Box display="flex" flexDirection="row" gap={2} alignItems="left" justifyContent="center">
            <Typography variant="h6">with an end date of</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={handleDateChange} sx={{ width: '170px', height: '20px', marginLeft: '10px' }} />
            </LocalizationProvider>
          </Box>
          <TextField
            label="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{ borderBottom: '1px solid #000', marginTop: '25px' }}
            value={title}
            onChange={(e) => handleFieldUpdate('title', e.target.value)}
           
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ marginTop: '10px' }}
          >
            Upload Cover Image
            <VisuallyHiddenInput
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
            />
          </Button>
        </FormControl>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="File uploaded successfully!"
          
        />
      </Box>
    </ThemeProvider>
  );
}

export default FundRaisingStep3;
