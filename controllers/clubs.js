import mongoose from "mongoose";
import clubModel from "../models/clubs.js";

export const getClub = async (req, res) => {

    const { clubId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
        var err = new Error("Club not found.");
        err.status = 406;
        return err;
    }
    var club0;

    try {
        club0 = await clubModel.findOne({ _id: clubId });

    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;

    }

    if(club0 != null)
    {
        try {
            const club = await clubModel.findOne({ _id: clubId })
                                        .populate("memberids", "name")
                                        .populate("presidentid", "name")
                                        .populate("eventids", "name");
            return club;

        } catch (error) {
            error.message = "Unable to connect with database.";
            return error;
        }
    }
    else {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return err;
    }

};

export const getTechClubs = async (req, res) => {

    try {
        const clubs = await clubModel.find({ typeofclub: "Technical" }, "name");
        return clubs;

    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;
    }

};

export const getCultClubs = async (req, res) => {

    try {
        const clubs = await clubModel.find({ typeofclub: "Cultural" }, "name");
        return clubs;

    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;
    }

};

export const postClub = async (req, res) => {

    const body = req.body;
    const newClub = new clubModel(body);

    try {
        await newClub.save();
        return newClub;

    } catch (error) {
        error.status = 400;
        error.message = "The club name already exsist.";
        return error;
    }

};


export const putClub = async (req, res) => {

    const body = req.body;
    var club;

    try {
        club = await clubModel.findOne({ _id: body._id });

    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;

    }

    if (club != null) {
        try {
            await clubModel.updateOne({ _id: body._id }, req.body);
            return (await clubModel.findOne(body));

        } catch (error) {
            error.status = 400;
            error.message = "The club name already exsist.";
            return error;
        }
    }
    else {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return err;
    }
};

export const delClub = async (req, res) => {

    const body = req.body;
    var club;

    try {
        club = await clubModel.findOne({ _id: body._id });

    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;

    }

    if (club != null) {
        try {
            await clubModel.deleteOne(body);
            return body;

        } catch (error) {
            error.message = "Unable to connect with database.";
            return error;
        }
    }
    else {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return err;
    }
};