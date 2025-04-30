
import express from 'express'
const router = express.Router();
import tradeController from '../controllers/tradeController.js';
import { protect } from '../middlewares/authMiddleware.js';

// @route POST /api/trades
router.post('/',protect, tradeController.createTrade);

// @route GET /api/trades
router.get('/', tradeController.getAllTrades);

// @route POST /api/trades/bulk
router.post('/bulk',protect, tradeController.bulkCreateTrades);

export default router;
