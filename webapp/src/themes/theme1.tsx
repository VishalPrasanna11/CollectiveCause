import { createTheme } from '@mui/material/styles';

// Create and export your custom Material-UI theme
export const MyTheme = createTheme({
  palette: {
    primary: {
      main: '#478C5C', // Adjusted main color without extra space
    },
    background: {
      default: '#ffffff', // Set default background color to #ffffff
      paper: '#478C5C', // Set paper background color to purple
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          transition: 'color 0.3s ease',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          margin: '2px',
          width: '150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            background: '#478C5C', // Change background color on hover
          },
          '& .MuiSvgIcon-root': {
            // color: '#478C5C', // Default icon color
            transition: 'color 0.3s ease',
          },
          '&:hover .MuiSvgIcon-root': {
            color: '#ffffff', // Change icon color to #ffffff on hover
          },
          '& .MuiTypography-root': {
            // color: '#478C5C', // Default typography color
            transition: 'color 0.3s ease',
          },
          '&:hover .MuiTypography-root': {
            color: '#ffffff', // Change typography color to #ffffff on hover
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        },
      },
    },
    // Add more component styles as needed...
  },
});
