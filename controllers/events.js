import eventModel from "../models/events.js";

export const getEvent = async (req,res) => {
    try {
        const events = await eventModel.find();
        res.setHeader("ContentType", "application/json");
        res.status(200).json(events);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });
    }

};

export const postEvent = async (req,res) => {

    const body = req.body;
    const newevent = new eventModel(body);
    try {
        await newevent.save();
        res.setHeader("ContentType", "application/json");
        res.status(200).json(newevent);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });        
    }

};

export const putEvent = async (req,res) => {
    var event;

    try {
        event = await eventModel.findOne({ _id: req.body._id});
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });    

    }
    
    if(event!=null)
    {
        try {
            await eventModel.updateOne({ _id: req.body._id }, req.body);
            res.setHeader("ContentType", "application/json");
            res.status(200).json(await eventModel.findOne(req.body));
        
        } catch (error) {
            res.setHeader("ContentType", "application/json");
            res.status(error.status).json({ message: error.message });
        }
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(406).json({ message: "The Event doesn't exsist."});
    }
};

export const delEvent = async (req,res) => {

    var event;

    try {
        event = await eventModel.findOne({ _id: req.body._id});
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });    

    }
    
    if(event!=null)
    {
        try {
            await eventModel.deleteOne(req.body);
            res.setHeader("ContentType", "application/json");
            res.status(200).json(req.body);
        
        } catch (error) {
            res.setHeader("ContentType", "application/json");
            res.status(error.status).json({ message: error.message });
        }
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(406).json({ message: "The Event doesn't exsist."});
    }
};