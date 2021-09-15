import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    date: Date,
    meetlink: {
        type: String,
        unique: true
    },
    description: String,
    club: {
        type: Schema.Types.ObjectId,
        ref: "clubModel"
    }

});

const eventModel = mongoose.model("eventModel", eventSchema);

export default eventModel;