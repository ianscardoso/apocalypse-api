import * as mongoose from 'mongoose'

export interface InventoryItem extends mongoose.Document {
    description: string,
    quantity: number,
    points: number
}

export interface Survivor extends mongoose.Document {
    name: string,
    age: number,
    gender: string,
    lastLocation: string,
    inventory: InventoryItem[],
    infectionReports: number
}

const inventoryItemSchema = new mongoose.Schema({
    description: String,
    quantity: Number,
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
        default: undefined, // arrays in mongoose Models are set as 'default: []'. This is a workaround to require the inventory upon registration
        required: true,        
        select: false
    },
    infectionReports: Number
})

export const Survivor = mongoose.model<Survivor>('Survivor', survivorSchema)