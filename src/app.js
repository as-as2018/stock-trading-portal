import express from "express";
import authRoutes from './routes/authRoutes.js'
import tradeRoutes from './routes/tradeRoutes.js'
import lotRoutes from './routes/lotRoutes.js'
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from "../doc/swagger.js";



// Initialize app
const app = express();

// Middleware
app.use(express.json());

app.use(morgan('combined'))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/lots', lotRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));





export default app