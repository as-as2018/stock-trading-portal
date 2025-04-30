import Lot from'../src/models/Lot';
import { Trade } from '../src/models/Trade';
import { processLIFO } from'../src/services/lifoService';

describe('LIFO Service', () => {
    it('should realize newest lots first in LIFO order', async () => {
        const t1 = await Trade.create({ stock_name: 'Apple', quantity: 100, broker_name: 'B1', price: 100, amount: 10000 });
        await processLIFO(t1);

        const t2 = await Trade.create({ stock_name: 'Apple', quantity: 200, broker_name: 'B2', price: 110, amount: 22000 });
        await processLIFO(t2);

        const t3 = await Trade.create({ stock_name: 'Apple', quantity: -150, broker_name: 'B1', price: 120, amount: -18000 });
        await processLIFO(t3);

        const lots = await Lot.find().sort({ _id: -1 });

        expect(lots.length).toBe(2);
        expect(lots[0].realized_quantity).toBe(150); // Latest lot used fully
        expect(lots[0].lot_status).toBe('PARTIALLY REALIZED');

        expect(lots[1].realized_quantity).toBe(0); // Oldest lot untouched
        expect(lots[1].lot_status).toBe('OPEN');
    });
});
