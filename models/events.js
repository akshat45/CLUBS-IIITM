import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    meetlink: {
        type: String,
        unique: true
    },
    description: String
});

const eventModel = mongoose.model("eventModel", eventSchema);

export default eventModel;