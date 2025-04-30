import express from "express";
import authRoutes from './routes/authRoutes.js'
import tradeRoutes from './routes/tradeRoutes.js'
import lotRoutes from './routes/lotRoutes.js'
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from "../doc/swagger.js";
import cors from "cors";




// Initialize app
const app = express();

// Middleware
app.use(
    cors({
      origin: [
        "http://localhost:5173",
        'https://stock-portal.netlify.app/'
      ],
      credentials: true,
    })
  );

app.use(express.json());

app.use(morgan('combined'))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/lots', lotRoutes);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));





export default app