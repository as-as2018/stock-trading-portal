
import { Lot } from '../models/Lot.js';
import {Trade} from '../models/Trade.js'


import { processFIFO } from'../services/fifoService.js'
import { processLIFO } from'../services/lifoService.js'

const createTrade = async (req, res) => {
    try {
        const { stock_name, quantity, broker_name, price, mode = 'FIFO' } = req.body;
        const amount = quantity * price;

        const trade = new Trade({
            stock_name,
            quantity,
            broker_name,
            price,
            amount
        });

        await trade.save();

        // Select method
        if (mode === 'FIFO') {
            await processFIFO(trade);
        } else if (mode === 'LIFO') {
            await processLIFO(trade);
        } else {
            throw new Error("Invalid mode. Use 'FIFO' or 'LIFO'.");
        }

        res.status(201).json({ success: true, data: trade });
    } catch (error) {
        console.error('Error creating trade:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const getAllTrades = async (req, res) => {
    try {
        const trades = await Trade.find().sort({ timestamp: -1 });
        res.status(200).json({ success: true, data: trades });
    } catch (error) {
        console.error('Error fetching trades:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



const bulkCreateTrades = async (req, res) => {
    try {
        const { trades, mode = 'FIFO' } = req.body;
        if (!Array.isArray(trades) || trades.length === 0) {
            return res.status(400).json({ success: false, message: 'No trades provided' });
        }

        const results = await bulkUploadTrades(trades, mode);
        res.status(200).json({ success: true, results });
    } catch (error) {
        console.error('Bulk upload failed:', error);
        res.status(500).json({ success: false, message: 'Server error during bulk upload' });
    }
};






export default  {
    createTrade,
    getAllTrades,
    bulkCreateTrades
};
