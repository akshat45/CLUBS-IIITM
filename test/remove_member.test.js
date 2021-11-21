import { removeMember } from "../controllers/clubs.js";
import chai from 'chai';
import express from "express"

const expect = chai.expect;
const app = express();

describe('Remove member', () => {
    var status="requesting";
    try{
        app.post("/:clubId/remove/:studentId", async function (req, res, next) {
            const member = await removeMember(req, res);
        });
        status="member removed successfully";
}
catch{
    status="can't remove member";
}

it('Member Removed', () => {
    expect(status).to.equal("member removed successfully");
});

});