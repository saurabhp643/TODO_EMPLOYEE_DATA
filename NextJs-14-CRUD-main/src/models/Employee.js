import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const Employee =
    mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema)