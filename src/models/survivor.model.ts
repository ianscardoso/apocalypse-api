import * as mongoose from 'mongoose'

export interface Survivor extends mongoose.Document {
    name: String,
    age: Number,
    gender: String,
    lastLocation: String,
    inventory: [],
    trades: [],
    infectionReports: Number
}

const survivorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    lastLocation: String,
    inventory: [],
    trades: [],
    infectionReports: Number
})

export const Survivor = mongoose.model<Survivor>('Survivor', survivorSchema)