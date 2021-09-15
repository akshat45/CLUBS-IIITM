import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneno: {
        type: Number,
        unique: true,
        minimum: 1000000000,
        maximum: 9999999999,
        required: true
    },
    linkedin: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    branch: {
        type: String
    },
    year: {
        type: Number,
        minimum: 1,
        maximum: 5
    }

});

export default mongoose.model("Student", studentSchema);