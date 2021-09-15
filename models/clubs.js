import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clubSchema = mongoose.Schema({
    
    name: {
        type: String,
        unique: true
    },
    description: String,
    achievements: [String],
    eventids: [{
        type: Schema.Types.ObjectId,
        ref: "eventModel"
    }],
    memberids:  [{
        type: Schema.Types.ObjectId,
        ref: "studentModel"
    }],
    presidentid: {
        type: Schema.Types.ObjectId,
        ref: "studentModel"
    },
    typeofclub: String
});

const clubModel = mongoose.model("clubModel", clubSchema);

export default clubModel;