import dotenv from 'dotenv';
import app from './app.js';
import swagger from './swagger.js';

dotenv.config();
// Start the server
swagger(app);
const PORT = process.env.PORT || 8004 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} server.js`);
});