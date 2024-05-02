import React  from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, TextField, FormControl, InputLabel, TextareaAutosize, Input } from '@mui/material';
import { PersonOutlineOutlined,PeopleAltOutlined,Groups2Outlined,Diversity1Outlined } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { MyTheme } from '../themes/theme1';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { updateField } from '../reducers/fundrasierslice'; // Import your fundRaisingFormSlice 
import { RootState } from '../store/store';
import Autocomplete from "react-google-autocomplete";
import { useState } from 'react';

function Stepper2() {

  const API_KEY="AIzaSyANzOKYaKT-6TRNHiOAVIFRZu_bNZyyiQI";
  const [locationInput, setLocationInput] = useState('');

  const { beneficiary_type, beneficiary_name, beneficiary_location,description } = useSelector((state: RootState) => state.fundRaisingForm);
  
  interface FundRaisingForm{
    beneficiary_type: String,
    beneficiary_name: String,
    description: String,
    beneficiary_location: String,
  }

 
  
  const dispatch = useDispatch();
  
  const isButtonSelected = (value: string) => {
    // Return true for 'Individual' initially
    return beneficiary_type === value || (value === 'Individual' && beneficiary_type === '');
  };
 
  const [nameError, setNameError] = useState('');

  const handleFieldUpdate = (field: keyof FundRaisingForm, value: string) => {
    let isValid = true;

    // Validation logic for the beneficiary name
    if (field === 'beneficiary_name') {
      const nameRegex = /^[a-zA-Z ]+$/; // Allows letters and spaces only
      if (!value || value.length < 3 || !nameRegex.test(value)) {
        const errorText = 'Name must be at least 3 characters long and contain only letters.';
        setNameError(errorText);
        isValid = false; // Mark validation as failed
      } else {
        setNameError(''); // Clear error message if valid
      }
    }
    
    // Only dispatch the update if the field is valid
    if (isValid) {
      dispatch(updateField({ field, value }));
    }
  }; 
  const handleLocationSelect = (place) => {
    if (place) {
      dispatch(updateField({ field: 'beneficiary_location', value: place.formatted_address }));
    }
  }

  const handleToggleChange = (value: string) => {
    handleFieldUpdate('beneficiary_type', value); // Update cause_type field on toggle change
  };
  React.useEffect(() => {
    console.log('Beneficiary Type:', beneficiary_type);
    console.log('Beneficiary Name:', beneficiary_name);
    console.log('Description:', description);
    console.log('Beneficiary Location:', beneficiary_location);
  }, [beneficiary_type, beneficiary_name, description, beneficiary_location]);

  return (
    <ThemeProvider theme={MyTheme}>
      <Box sx={{position:'relative',margin:'20px auto',width:"500px",padding:"20px", backgroundColor:"white",borderRadius:"10px",boxShadow: "2px 2px 4px 0 white"
}}>
        <Box display={'flex'} flexDirection={'row'} gap={'10px'} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h6">
          This fundrasier will benefit my/a 
        </Typography>
        <InputLabel id="dropdown-label">{beneficiary_type || 'Individual'}</InputLabel>
        </Box>
        <Box>
        <ToggleButtonGroup>
          <Box>
            <ToggleButton
              value="Individual"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('Individual') ? '#478C5C' : 'white',
                color: isButtonSelected('Individual') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('Individual')}
            >
              <PersonOutlineOutlined/>
              <Typography variant="body1">Individual</Typography>
            </ToggleButton>
            <ToggleButton
              value="Friend"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('Friend') ? '#478C5C' : 'white',
                color: isButtonSelected('Friend') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('Friend')}
            >
              <PeopleAltOutlined sx={{ color: isButtonSelected('Friend') ? 'white' : '#478C5C' }} />
              <Typography variant="body1">Friend</Typography>
            </ToggleButton>
          </Box>
          <Box>
            <ToggleButton
              value="Group"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('Group') ? '#478C5C' : 'white',
                color: isButtonSelected('Group') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('Group')}
            >
              <Groups2Outlined sx={{ color: isButtonSelected('Group') ? 'white' : '#478C5C' }} />
              <Typography variant="body1">Group</Typography>
            </ToggleButton>
            <ToggleButton
              value="NGO"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('NGO') ? '#478C5C':'inherit',
                color: isButtonSelected('NGO') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('NGO')}
                
            >
              <Diversity1Outlined sx={{ color: isButtonSelected('NGO') ? 'white' : '#478C5C' }} />
              <Typography variant="body1">NGO</Typography>
            </ToggleButton>
          </Box>
        </ToggleButtonGroup>
        </Box>
        <FormControl   sx={{margin:"10px 50px 10px 30px",width:"85%"}}>
      <TextField
        label="Benificary Name"
        variant="standard"
        InputProps={{ disableUnderline: true }} // Remove underline
        sx={{ borderBottom: '1px solid #000' }} // Add bottom border
        onChange={(e) => handleFieldUpdate("beneficiary_name", e.target.value)}
        error={!!nameError}
            helperText={nameError}
      />
      <Typography textAlign={'left'} sx={{color:"#478C5C",fontSize:"12px",marginTop:"5px"}}>
        Location
      </Typography>
      <Input
  fullWidth
  color="secondary"
  value={locationInput}
  onChange={e => setLocationInput(e.target.value)}
  inputComponent={({ inputRef, onFocus, onBlur, ...inputProps }) => (
    <Autocomplete
      apiKey={API_KEY}
      {...inputProps}
      onPlaceSelected={(selected) => {
        handleLocationSelect(selected);
        setLocationInput(selected.formatted_address);
      }}
    />
  )}
/>
      <Typography textAlign={'left'} sx={{color:"#478C5C",fontSize:"12px",marginTop:"5px"}}>
        Descrption
      </Typography>
      
      <TextareaAutosize
      aria-label="Description"
      placeholder="Enter your description here..."
      minRows={3} // Minimum number of rows to start with
      maxRows={6} // Maximum number of rows before scrollbar appears
      style={{
        width: '100%',
        minHeight:"50px", // Set the width to 100% of its container
        resize: 'none', // Disable manual resizing by the user
        border: '1px solid #000', // Add border styling
        borderRadius: '4px', // Add border radius for appearance
        padding: '8px', // Add padding for content spacing
      }}
      onChange={(e) => handleFieldUpdate('description', e.target.value)}
      
    />

    </FormControl>
      </Box>
    </ThemeProvider>
  );
}
//   <gmpx-api-loader key="AIzaSyBgwXJ_FpsQhwe3eORf0hm-EefxkOSWtBA" solution-channel="GMP_DOCS_placepicker_v1"></gmpx-api-loader>

export default Stepper2;
