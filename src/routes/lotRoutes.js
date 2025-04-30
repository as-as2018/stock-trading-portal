
import express from 'express'
const router = express.Router();
import lotController from '../controllers/lotController.js'

// GET /api/lots/fifo
router.get('/fifo', lotController.getAllLotsFIFO);

// GET /api/lots/lifo
router.get('/lifo', lotController.getAllLotsLIFO);

export default router;
