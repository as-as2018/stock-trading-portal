import { Lot } from "../models/Lot.js";


const getAllLotsFIFO = async (req, res) => {
    try {
        const lots = await Lot.find()
            .populate('trade_id realized_trade_ids')
            .sort({ _id: 1 }); // FIFO: oldest first
        res.status(200).json({ success: true, data: lots });
    } catch (error) {
        console.error('Error fetching FIFO lots:', error);
        res.status(500).json({ success: false, message: 'Error fetching lots' });
    }
};

const getAllLotsLIFO = async (req, res) => {
    try {
        const lots = await Lot.find()
            .populate('trade_id realized_trade_ids')
            .sort({ _id: -1 }); // LIFO: newest first
        res.status(200).json({ success: true, data: lots });
    } catch (error) {
        console.error('Error fetching LIFO lots:', error);
        res.status(500).json({ success: false, message: 'Error fetching lots' });
    }
};


export default { getAllLotsFIFO,getAllLotsLIFO };
