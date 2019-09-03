import * as mongoose from 'mongoose'
import { InventoryItem } from './InventoryItem.model';
import { Survivor } from './survivor.model';

export interface Trade extends mongoose.Document {
    survivor1: mongoose.Types.ObjectId | Survivor,
    inventoryItemTrade1: InventoryItem[],
    survivor2: mongoose.Types.ObjectId | Survivor,
    inventoryItemTrade2: InventoryItem[],
    date: Date,
    tradeValue: number // amount of points
}

const inventoryItemSchema = new InventoryItem().schema;
const tradeSchema = new mongoose.Schema({
    survivor1: {
        type: mongoose.Types.ObjectId,
        ref: 'Survivor',
        required: true
    },
    itemsTradeSurvivor1: {
        type: [inventoryItemSchema]
    },
    survivor2: {
        type: mongoose.Types.ObjectId,
        ref: 'Survivor',
        required: true
    },
    itemsTradeSurvivor2: {
        type: [inventoryItemSchema]
    },
    date: {
        type: Date
    },
    tradeValue: Number
})

export const Trade = mongoose.model<Trade>('Trade', tradeSchema)