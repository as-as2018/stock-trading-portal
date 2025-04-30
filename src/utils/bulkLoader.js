
const Trade = require('../models/Trade');
const { processFIFO } = require('../services/fifoService');
const { processLIFO } = require('../services/lifoService');

const bulkUploadTrades = async (trades, mode = 'FIFO') => {
    const results = [];
    for (const entry of trades) {
        try {
            const { stock_name, quantity, broker_name, price } = entry;
            const amount = quantity * price;

            const trade = new Trade({
                stock_name,
                quantity,
                broker_name,
                price,
                amount
            });

            await trade.save();

            if (mode === 'FIFO') {
                await processFIFO(trade);
            } else if (mode === 'LIFO') {
                await processLIFO(trade);
            } else {
                throw new Error('Invalid mode: ' + mode);
            }

            results.push({ trade, success: true });
        } catch (error) {
            results.push({ error: error.message, trade: entry, success: false });
        }
    }

    return results;
};

module.exports = { bulkUploadTrades };
