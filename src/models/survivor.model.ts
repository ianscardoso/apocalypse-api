import * as mongoose from 'mongoose'
<<<<<<< Updated upstream
import { InventoryItem } from './InventoryItem.model';
=======
import { InventoryItem } from './inventoryItem.model';
>>>>>>> Stashed changes

export interface Survivor extends mongoose.Document {
    name: string,
    age: number,
    gender: string,
    lastLocation: string,
    inventory: InventoryItem[],
    infectionReports: number
    isInfected: boolean
}

const inventoryItemSchema = new InventoryItem().schema;
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
    infectionReports: {
        type: Number,
        default: 0
    },
    isInfected: {
        type: Boolean,
        default: false
    }
})

export const Survivor = mongoose.model<Survivor>('Survivor', survivorSchema)