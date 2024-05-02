import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/fund-routes.js';
// import dotenv from 'dotenv';
// import swaggerUI from 'swagger-ui-express';
// import swagger from './swagger.js';

// dotenv.config();
const app = express();
// const PORT = 27017;
const MONGODB_URI = 'mongodb+srv://prasannavi:wocqSuFyOhhiMMLS@coursecluster.x3x2qge.mongodb.net/CollectiveCause?retryWrites=true&w=majority&appName=coursecluster';
// const MONGODB_URI = process.env.MONGODB_URI;
// const PORT = process.env.PORT||3002; 

app.use(cors())
app.use(express.json());
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/fundraising', router);


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error.message));

export default app;
