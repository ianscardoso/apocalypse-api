import * as mongoose from 'mongoose'
import { Item } from './item.model';

export interface InventoryItem extends mongoose.Document {
    item: mongoose.Types.ObjectId | Item,
    quantity: number
}

const inventoryItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
})

export const InventoryItem = mongoose.model<InventoryItem>('InventoryItem', inventoryItemSchema)