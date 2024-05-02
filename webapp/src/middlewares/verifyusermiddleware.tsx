import axios from 'axios';

// Base URL for the user-related API endpoint
const baseURL = "http://localhost:8001/user/";

/**
 * Verifies and potentially registers a user in the backend database.
 * @param {Object} user User object containing at least email and name.
 */
const verifyUser = async (user) => {
  try {
    // Send a POST request to the server with the user's email and name
    const response = await axios.post(baseURL, {
      email: user.email,
      // fullName: user.name  // Assuming the backend expects 'fullName'
    });
    // Log the server's response to the console
    console.log('User verification complete:', response.data);
  } catch (error) {
    // Handle errors in making the request or errors returned from the server
    console.error('Error verifying user:', error.response ? error.response.data : error.message);
  }
};





export default verifyUser;
