
import mongoose from "mongoose";

const LotSchema = new mongoose.Schema({
    stock_name: { type: String, required: true },
    trade_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade', required: true },
    lot_quantity: { type: Number, required: true },
    realized_quantity: { type: Number, default: 0 },
    realized_trade_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }],
    lot_status: { 
        type: String, 
        enum: ['OPEN', 'PARTIALLY REALIZED', 'FULLY REALIZED'], 
        default: 'OPEN' 
    }
});


export const Lot = mongoose.model("Lot", LotSchema);
