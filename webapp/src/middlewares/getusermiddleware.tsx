import axios from 'axios';

// Base URL for the user-related API endpoint
const baseURL = "http://localhost:8001/user/";

export const getUserByEmail = async (email) => {
    try {
      // Construct the URL with the email ID as a query parameter
      const url = `${baseURL}/${email}`;
      
      // Send a GET request to the server
      const response = await axios.get(url);
      
      // Log the server's response to the console
      console.log('User data:', response.data);
      
      // Return the user data
      return response.data;
    } catch (error) {
      // Handle errors in making the request or errors returned from the server
      console.error('Error fetching user:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error to let the caller handle it
    }
  };