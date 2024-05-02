import { Button } from "@mui/material";
import { MyTheme } from "../themes/theme1";
import { ThemeProvider } from '@mui/material/styles';
import { NavLink as RouterNavLink } from 'react-router-dom';

function StartAFundRaiser(){
    return(
        <ThemeProvider theme={MyTheme}>
       <Button
  component={RouterNavLink}
  to="/fundraise"
  variant="contained"
  color="inherit"
  sx={{
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
  }}
>
  Start a fundraiser
</Button>
      </ThemeProvider>
    )
}

export default StartAFundRaiser;