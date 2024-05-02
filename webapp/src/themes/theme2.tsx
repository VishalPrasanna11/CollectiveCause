import { createTheme } from '@mui/material/styles';

// Adjust the colors to match the uploaded image
export const MyEditTheme = createTheme({
  palette: {
    primary: {
      main: '#E8EFCF', // This is a purplish color, adjust as needed to match the "Choose file" button
    },
    secondary: {
      main: '#6A1B9A', // This can be the color for the Save button or the avatar background
    },
    background: {
      default: '#E8EFCF', // White background
      paper: '#D4E7C5', // Light grey for paper components, adjust as needed
    },
    text: {
      primary: '#212121', // Dark grey color for primary text
      secondary: '#757575', // Light grey color for secondary text
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#9C27B0', // Color of the label when the TextField is focused
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#9C27B0', // Color of the underline when the TextField is focused
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700, // Makes the text on buttons bolder, adjust as needed
        },
        contained: {
          color: 'white', // Text color for contained buttons
          boxShadow: 'none', // Remove shadow from buttons
        },
      },
    },
    // Any other component overrides...
  },
});
