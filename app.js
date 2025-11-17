import express from 'express';
import path from 'path';
import userRoutes from './routes/userroutes.js';
import logger from './middleware/logger.js';

const app = express();
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'src')));

app.use(logger);
app.use('/', userRoutes);

export default app;
