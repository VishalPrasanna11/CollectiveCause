import React from 'react';
import { Grid, Typography, Button, IconButton, Box, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MyTheme } from '../themes/theme1';
import StartAFundRaiser from './StartAFundrasiserButton';
import MainLogo from '../assets/logo01.png';
// You may need to adjust the colors based on the actual hex values from your image.

function Footer() {
  return (
    <ThemeProvider theme={MyTheme}>
      <Box sx={{bgcolor:"#1D5758",p: 2 }}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
          
          <Grid item>
        <img src={MainLogo} alt="Collective Cause Logo" style={{ width: 250, height: 250, marginLeft: 60, paddingTop:30 }} />
      </Grid>
            
          </Grid>
          <Grid item xs={12} sm={4} marginTop={10}>
            <Typography variant="h6" gutterBottom>Head Office</Typography>
            <Typography variant="body2">
              Collective Cause Org <br />
              306,Huntington Ave<br />
              Boston , MA - 02115
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 2}}>
          © 2024 collectivecause.org All rights reserved.
        </Typography>
          </Grid>
          <Grid item xs={10} sm={4} marginTop={8}>
            <Box sx ={{marginLeft:"150px"}}><StartAFundRaiser/></Box>
            <Typography sx={{textAlign:"center",margin:"10px 0 0 0"}}>About Us</Typography>
            <Typography sx={{textAlign:"center",margin:"2px 0 0 0"}}>Contact Us</Typography>
            <Typography sx={{textAlign:"center",margin:"2px  0 0 0"}}>FAQs</Typography>

            <IconButton color="inherit" sx={{marginLeft:"160px"}}><FacebookIcon /></IconButton>
            <IconButton color="inherit"><TwitterIcon /></IconButton>
            <IconButton color="inherit"><LinkedInIcon /></IconButton>
            <IconButton color="inherit"><InstagramIcon /></IconButton>
          </Grid>
          <Grid item>
            
          </Grid>
        </Grid>
        
      </Box>
      
    </ThemeProvider>
  );
}

export default Footer;
