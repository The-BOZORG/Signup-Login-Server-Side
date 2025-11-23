import express from 'express';
import userRoutes from './routes/userroutes.js';
import logger from './middleware/logger.js';


const app = express();
app.use(express.json());

app.use(logger)
app.use('/', userRoutes);

export default app;
