import chai from 'chai';
import dotenv from "dotenv";
import express from "express";
import { delStudent } from "../controllers/students.js";

dotenv.config();

const expect = chai.expect;
const app = express();

describe('Unregister Test', () => {
    var status="requesting";
    try{
    
        app.post("/:studentId/delete", async function (req, res, next) {

            const student = await delStudent(req, res);
                
        });
        
        status="unregisterd successfully";
}
catch{
    status="unable to unregister";
}

it('Unregister status', () => {
    expect(status).to.equal("unregisterd successfully");
});

});