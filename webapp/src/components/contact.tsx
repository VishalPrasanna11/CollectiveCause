import * as React from 'react';
import { Typography, Grid, Card, CardContent, IconButton, ThemeProvider } from '@mui/material';
import { Room, Email, Phone } from '@mui/icons-material';
import { MyTheme } from '../themes/theme1';
const ContactUs = () => {
  return (
    <ThemeProvider theme={MyTheme}>
        <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom component="div">
          Contact us
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          We are here to help you and answer any questions you may have. Here is how to reach us!
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <IconButton color="default">
              <Room />
            </IconButton>
            <Typography variant="body1">INDIA</Typography>
            <Typography variant="body2">Collective Cause Ventures India Pvt. Ltd. Nextcoworks JP Nagar - Coworking 
            Space JP Nagar Alankar Plaza, Bk circle, Nayak Layout, 8th Phase, J. P. Nagar,
Bangalore, Karnataka, India 560078</Typography>
          </Grid>
          <Grid item>
            <IconButton color="default">
              <Email />
            </IconButton>
            <Typography variant="body2">CollectiveCause@gmail.com</Typography>
          </Grid>
          <Grid item>
            <IconButton color="default">
              <Phone />
            </IconButton>
            <Typography variant="body2">+1 616 407 4295</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>


    </ThemeProvider>
    
  );
};

export default ContactUs;
