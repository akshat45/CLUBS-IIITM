import clubModel from "../models/clubs.js";

export const getClubs = async (req,res) => {
    try {
        const clubs = await clubModel.find();
        res.setHeader("ContentType", "application/json");
        res.status(200).json(clubs);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });
    }

};

export const postClub = async (req,res) => {

    const body = req.body;
    const newClub = new clubModel(body);

    try {
        await newClub.save();
        res.setHeader("ContentType", "application/json");
        res.status(200).json(newClub);
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });        
    }

};


export const putClub = async (req,res) => {

    const body = req.body;
    var club;

    try {
        club = await clubModel.findOne({ _id: body._id});
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });    

    }

    if(club!=null)
    {
        try {
            await clubModel.updateOne({ _id: body._id }, req.body);
            res.setHeader("ContentType", "application/json");
            res.status(200).json(await clubModel.findOne(body));

        } catch (error) {
            res.setHeader("ContentType", "application/json");
            res.status(error.status).json({ message: error.message });     
        }
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(406).json({ message: "The Club doesn't exsist."});
    }
};

export const delClub = async (req,res) => {

    const body = req.body;
    var club;

    try {
        club = await clubModel.findOne({ _id: body._id});
        
    } catch (error) {
        res.setHeader("ContentType", "application/json");
        res.status(error.status).json({ message: error.message });    

    }

    if(club!=null)
    {
        try {
            await clubModel.deleteOne(body);
            res.setHeader("ContentType", "application/json");
            res.status(200).json(body);
        
        } catch (error) {
            res.setHeader("ContentType", "application/json");
            res.status(error.status).json({ message: error.message });    

        }
    }
    else
    {
        res.setHeader("ContentType", "application/json");
        res.status(406).json({ message: "The Club doesn't exsist."});
    }
};