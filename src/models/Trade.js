import  mongoose  from "mongoose";

const TradeSchema = new mongoose.Schema({
    stock_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    broker_name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const Trade = mongoose.model("Trade", TradeSchema);