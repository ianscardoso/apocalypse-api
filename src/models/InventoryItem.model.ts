import * as mongoose from 'mongoose'

export interface InventoryItem extends mongoose.Document {
    description: string,
    quantity: number,
    points: number
}

const inventoryItemSchema = new mongoose.Schema({
    description: String,
    quantity: Number,
    points: Number
})

export const InventoryItem = mongoose.model<InventoryItem>('InventoryItem', inventoryItemSchema)