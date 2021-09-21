import mongoose from "mongoose";
import clubModel from "../models/clubs.js";
import eventModel from "../models/events.js";

export const getEvent = async (req,res) => {

    const { eventId: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        var err = new Error("The Event doesn't exsist.");
        err.status = 406;
        return err;
    }

    try {
        const event = await eventModel.findOne({ _id: _id});
        return event;
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;
    }

};

export const getUpcomingEvents = async (req,res) => {

    try {
        const events = await eventModel.find();
        const comp = new Date().getTime();
        const comtime = 604800000;
        var recentevents = [];
        events.map((event) => { if(Math.abs(comp-(event.date).getTime()) <= comtime && (comp-(event.date).getTime()) <= 0) recentevents.push(event); });
        return recentevents;
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;
    }

};

export const getEvents = async (req,res) => {
    try {
        const events = await eventModel.find();
        return events;
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;
    }

};

export const postEvent = async (req,res) => {

    const { clubId } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(clubId))
    {
        var err = new Error("The Club doesn't exsist.");
        err.status = 406;
        return err; 
    }

    const body = req.body;
    const newevent = new eventModel(body);

    try {
        await newevent.save();
        try {
            await clubModel.findOneAndUpdate({ _id: clubId }, { $push: { eventids: newevent._id } });
            return newevent;
            
        } catch (error) {
            error.status = 400;
            error.message = "The club doesn't exsist.";
            return error;            
        }
        
    } catch (error) {
        error.message = "Meetlink or Event name already exsists";
        return error;     
    }

};

export const putEvent = async (req,res) => {
    var event;

    try {
        event = await eventModel.findOne({ _id: req.body._id});
        
    } catch (error) {
        error.message = "Unable to connect with database.";
        return error;   

    }
    
    if(event!=null)
    {
        try {
            await eventModel.updateOne({ _id: req.body._id }, req.body);
            return (await eventModel.findOne(req.body));
        
        } catch (error) {
            error.message = "Meetlink or Event name already exsists";
            return error;
        }
    }
    else
    {
        var err = new Error("The Event doesn't exsist.");
        err.code(406);
        return err;
    }
};

export const delEvent = async (req,res) => {

    var event;

    try {
        event = await eventModel.findOne({ _id: req.body._id});
        
    } catch (error) {
        return error;  

    }
    
    if(event!=null)
    {
        try {
            await eventModel.deleteOne(req.body);
            return req.body;
        
        } catch (error) {
            return error;
        }
    }
    else
    {
        var err = new Error("The Event doesn't exsist.");
        err.code(406);
        return err;
    }
};