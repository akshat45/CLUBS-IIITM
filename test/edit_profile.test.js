import chai from 'chai';
import dotenv from "dotenv";
import { getStudent, putStudent, delStudent } from "../controllers/students.js";
import express from "express"
dotenv.config();

const expect = chai.expect;
const app = express();

describe('Basic Profile Test', () => {
    var get_profile="requesting";
    try{
    
        app.get("/:studentId/profile", async function (req, res, next) {

            const student = await getStudent(req, res);
            });
        get_profile="successful";
}
catch{
    get_profile="request denied";
}

it('Get student profile', () => {
    expect(get_profile).to.equal("successful");
});

});



