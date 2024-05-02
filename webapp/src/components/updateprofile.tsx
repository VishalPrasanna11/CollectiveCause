import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  TextField, 
  Button, 
  Avatar, 
  Typography, 
  Box 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import { MyEditTheme } from '../themes/theme2';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { updateField } from '../reducers/fundrasierslice'; // Import your fundRaisingFormSlice 
import { RootState } from '../store/store';
import { useAppSelector,getUser } from '../reducers/authslice';
import { getUserByEmail } from '../middlewares/getusermiddleware';
import { useEffect } from 'react';

interface user{
  name:String,
  email:String
}
interface ApiData {
  name: string;
  email: string;
  number: string;
  image: string;
}
function EditProfile() {
  
  const user = useAppSelector(getUser);
  const [profile, setProfile] = useState<ApiData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call to get user data by email
        const apiDataResponse = await getUserByEmail(user?.email);
        setProfile(apiDataResponse);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  

  const handlePhotoChange = (e) => {
    // Handle file change here...
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit action here...
    console.log(profile);
  };

  return (
    <ThemeProvider theme={MyEditTheme}>
      <Box sx={{ maxWidth: 500, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center' }}>
          Edit Profile
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Profile details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>Full Name</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="Full Name"
                  value={profile?.name}
                  // onChange={handleInputChange}
                />
              </Box>
              {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>Last name</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
              </Box> */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>Email</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={profile?.email}
                  // onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>Phone number</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="phone"
                  value={profile?.number}
                  //onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
                <Typography sx={{ width: '30%' }}>Change Profile Picture</Typography>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  {profile?.image}
                </Avatar>
                <Button variant="contained" component="label">
                  Choose file
                  <input
                    type="file"
                    hidden
                    onChange={handlePhotoChange}
                  />
                </Button>
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </ThemeProvider>
  );
}

export default EditProfile;
