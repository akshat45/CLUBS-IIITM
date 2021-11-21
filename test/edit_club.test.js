import chai from 'chai';
import dotenv from "dotenv";
import { getStudent, putStudent, delStudent } from "../controllers/students.js";
import express from "express"
dotenv.config();

const expect = chai.expect;
const app = express();

describe('Edit Club Test', () => {
    var edit_club="requesting";
    try{
    
        app.get("/:clubId/edit", async function (req, res, next) {
            const club = await getClub(req, res);        
        });
        
        edit_club="edit successfully";
}
catch{
    edit_club="Unable to edit";
}

it('Edit status', () => {
    expect(edit_club).to.equal("edit successfully");
});

});