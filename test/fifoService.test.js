
import Lot from'../src/models/Lot';
import { Trade } from '../src/models/Trade';
import { processFIFO } from '../src/services/fifoService';

describe('FIFO Service', () => {
    it('should realize oldest lots first in FIFO order', async () => {
        // Buy 1
        const t1 = await Trade.create({ stock_name: 'Apple', quantity: 100, broker_name: 'B1', price: 100, amount: 10000 });
        await processFIFO(t1);

        // Buy 2
        const t2 = await Trade.create({ stock_name: 'Apple', quantity: 200, broker_name: 'B2', price: 110, amount: 22000 });
        await processFIFO(t2);

        // Sell (should realize t1 first, then t2)
        const t3 = await Trade.create({ stock_name: 'Apple', quantity: -150, broker_name: 'B1', price: 120, amount: -18000 });
        await processFIFO(t3);

        const lots = await Lot.find().sort({ _id: 1 });

        expect(lots.length).toBe(2);
        expect(lots[0].realized_quantity).toBe(100);
        expect(lots[0].lot_status).toBe('FULLY REALIZED');

        expect(lots[1].realized_quantity).toBe(50);
        expect(lots[1].lot_status).toBe('PARTIALLY REALIZED');
    });
});
