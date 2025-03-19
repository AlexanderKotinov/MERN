import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentsRoutes from './routes/agents';
import newRealEastate from './routes/realEstates';
import bodyParser from 'body-parser';
import HttpError from './models/http-error';
import mongoose from 'mongoose';

dotenv.config({ path: './.env.local' });

const app = express();
const port = Number(process.env.PORT);
const host = process.env.HOST;
const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.pq8c3.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_DB}`;

app.use(bodyParser.json()); // for post requests
app.use(cors({origin: '*'}));
app.use('/api/agents', agentsRoutes);
app.use('/api/real-estates', newRealEastate);
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!'});
});
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(mongoUri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
}).then(() => {
  console.log('Connected to MongoDB');

  app.listen(port, host, () => {
    console.log(`Application started at http://${host}:${port}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
