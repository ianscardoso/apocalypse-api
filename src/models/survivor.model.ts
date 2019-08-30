import * as mongoose from 'mongoose'

export interface InventoryItem extends mongoose.Document {
    description: string,
    points: number
}

export interface Survivor extends mongoose.Document {
    name: string,
    age: number,
    gender: string,
    lastLocation: string,
    inventory: InventoryItem[],
    // trades: [],
    infectionReports: number
}

const inventoryItemSchema = new mongoose.Schema({
    description: String,
    points: Number
})

const survivorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    lastLocation: {
        type: String,
        required: true
    },
    inventory: {
        type: [inventoryItemSchema],
        required: true
    },
    // trades: [],
    infectionReports: Number
})

export const Survivor = mongoose.model<Survivor>('Survivor', survivorSchema)