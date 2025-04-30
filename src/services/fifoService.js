
import { Lot } from '../models/Lot.js';
import { Trade } from '../models/Trade.js';

export const processFIFO = async (trade) => {
    if (trade.quantity > 0) {
        // It's a BUY trade → create a new Lot
        const newLot = new Lot({
            stock_name: trade.stock_name,
            trade_id: trade._id,
            lot_quantity: trade.quantity
        });
        await newLot.save();
    } else {
        // It's a SELL trade → apply FIFO logic
        let remainingToSell = Math.abs(trade.quantity);

        // Fetch OPEN or PARTIALLY REALIZED lots in FIFO order
        const openLots = await Lot.find({
            stock_name: trade.stock_name,
            lot_status: { $in: ['OPEN', 'PARTIALLY REALIZED'] }
        }).sort({ _id: 1 });

        for (const lot of openLots) {
            const availableQty = lot.lot_quantity - lot.realized_quantity;
            const qtyToUse = Math.min(availableQty, remainingToSell);

            lot.realized_quantity += qtyToUse;
            lot.realized_trade_ids.push(trade._id);

            if (lot.realized_quantity === lot.lot_quantity) {
                lot.lot_status = 'FULLY REALIZED';
            } else {
                lot.lot_status = 'PARTIALLY REALIZED';
            }

            await lot.save();
            remainingToSell -= qtyToUse;

            if (remainingToSell <= 0) break;
        }

        if (remainingToSell > 0) {
            throw new Error(`Insufficient stock to sell ${trade.stock_name} shares.`);
        }
    }
};

