import React,{useState} from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, TextField, FormControl, InputLabel } from '@mui/material';
import { MedicalServicesOutlined, SchoolOutlined, FloodOutlined, OtherHousesOutlined } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { MyTheme } from '../themes/theme1';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { updateField } from '../reducers/fundrasierslice'; // Import your fundRaisingFormSlice 
import { RootState } from '../store/store';
import { useAppSelector,getUser } from '../reducers/authslice';

function Stepper1() {
  var { cause_type, fundriser_name, fundriser_email, fundriser_phoneNumber } = useSelector((state: RootState) => state.fundRaisingForm);
  const user = useAppSelector(getUser);

  interface FundRaisingForm{
    cause_type: string;
    fundriser_name: string;
    fundriser_email: string;
    fundriser_phoneNumber: Number;
  }


interface user{
  name:String,
  email:String
}
  //Dispatching the selectors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  //handling the is Button Selected
  const isButtonSelected = (value: string) => {
    // Return true for 'Medical' initially
    return cause_type === value || (value === 'Medical' && cause_type === '');
  };
  
  // handling the Change
  const handleFieldUpdate = (field: keyof FundRaisingForm, value: string) => {
    let error = false;

    // Validation logic
    if (field === 'fundriser_name') {
        if (!value || value.length < 3) {
            setNameError('Name must be at least 3 characters long.');
            error = true;
        } else {
            setNameError('');
        }
    } else if (field === 'fundriser_email') {
        if (!validateEmail(value)) {
            setEmailError('Enter a valid email.');
            error = true;
        } else {
            setEmailError('');
        }
    } else if (field === 'fundriser_phoneNumber') {
        if (!/^\d{10}$/.test(value)) {  // Simple numeric check
            setPhoneError('Phone number must be numeric and 10 digits.');
            error = true;
        } else {
            setPhoneError('');
        }
    }

    // Always dispatch updates regardless of the validation outcome
    if (!error) {
        dispatch(updateField({ field, value }));
    }
};
  //handleToggleChange

  const handleToggleChange = (value: string) => {
    handleFieldUpdate('cause_type', value); // Update cause_type field on toggle change
  };
  React.useEffect(() => {
    if (!fundriser_name && user?.name) {
      dispatch(updateField({ field: 'fundriser_name', value: user.name }));
    }
    if (!fundriser_email && user?.email) {
      dispatch(updateField({ field: 'fundriser_email', value: user.email }));
    }
  }, [dispatch, fundriser_name, fundriser_email, user]);
  
  React.useEffect(() => {
    console.log('Cause Type:', cause_type);
    console.log('Fundraiser Name:', fundriser_name);
    console.log('Fundraiser Email:', fundriser_email);
    console.log('Fundraiser Phone Number:', fundriser_phoneNumber);
  }, [cause_type, fundriser_name, fundriser_email, fundriser_phoneNumber]);
  return (
    <ThemeProvider theme={MyTheme}>
      <Box sx={{position:'relative',margin:'20px auto',width:"500px",padding:"20px", backgroundColor:"white",borderRadius:"10px",boxShadow: "2px 2px 4px 0 white"
}}>
        <Box display={'flex'} flexDirection={'row'} gap={'10px'} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h6">
          I am raising for a/an 
        </Typography>
        <InputLabel id="dropdown-label">{cause_type || 'Medical'}</InputLabel>
        <Typography variant="h6">
          cause 
        </Typography>
        </Box>
        <Box>

          {/* Toggle Button Group */}
        <ToggleButtonGroup>
          <Box>
            <ToggleButton
              value="Medical"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('Medical') ? '#478C5C' : 'white',
                color: isButtonSelected('Medical') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('Medical')}
            >
              <MedicalServicesOutlined  />
              <Typography variant="body1">Medical</Typography>
            </ToggleButton>
            <ToggleButton
              value="Education"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('Education') ? '#478C5C' : 'white',
                color: isButtonSelected('Education') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('Education')}
            >
              <SchoolOutlined sx={{ color: isButtonSelected('Education') ? 'white' : '#478C5C' }} />
              <Typography variant="body1">Education</Typography>
            </ToggleButton>
          </Box>
          <Box>
            <ToggleButton
              value="Disaster"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('Disaster') ? '#478C5C' : 'white',
                color: isButtonSelected('Disaster') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('Disaster')}
            >
              <FloodOutlined sx={{ color: isButtonSelected('Disaster') ? 'white' : '#478C5C' }} />
              <Typography variant="body1">Disaster</Typography>
            </ToggleButton>
            <ToggleButton
              value="Others"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                margin: '5px',
                backgroundColor: isButtonSelected('Others') ? '#478C5C':'inherit',
                color: isButtonSelected('Others') ? 'white' : '#478C5C',
              }}
              onClick={() => handleToggleChange('Others')}
            >
              <OtherHousesOutlined sx={{ color: isButtonSelected('Others') ? 'white' : '#478C5C' }} />
              <Typography variant="body1">Others</Typography>
            </ToggleButton>
          </Box>
        </ToggleButtonGroup>
        </Box>
        <FormControl   sx={{margin:"10px 50px 10px 30px",width:"85%"}}>
      <TextField
        label="Name"
        variant="standard"
        InputProps={{ disableUnderline: true }} // Remove underline
        sx={{ borderBottom: '1px solid #000' }}
        value={user?.name}
        onChange={(e) => handleFieldUpdate('fundriser_name', e.target.value)} // Add bottom border
        error={!!nameError}
        helperText={nameError}
     />
      <TextField
        label="Email ID"
        variant="standard"
        value={user?.email}
        InputProps={{ disableUnderline: true }} // Remove underline
        sx={{ borderBottom: '1px solid #000' }}
        onChange={(e) => handleFieldUpdate('fundriser_email', e.target.value)} // Add bottom border
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Phone number"
        variant="standard"
        InputProps={{ disableUnderline: true }} // Remove underline
        sx={{ borderBottom: '1px solid #000' }}
        onChange={(e) => handleFieldUpdate('fundriser_phoneNumber', e.target.value)} // Add bottom border
        error={!!phoneError}
            helperText={phoneError}
      />
    </FormControl>
      </Box>
    </ThemeProvider>
  );
}

export default Stepper1;
