import * as mongoose from 'mongoose'

export interface Item extends mongoose.Document {
    description: string,
    points: number
}

const itemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
})

export const Item = mongoose.model<Item>('Item', itemSchema)