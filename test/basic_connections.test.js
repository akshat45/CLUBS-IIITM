import chai from 'chai';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const expect = chai.expect;

describe('Basic Connection Test', () => {
    var status = "checking";
    try {
        mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        status = "connected";
    }
    catch {
        status = "disconnected";
    }
    it('Database connection', () => {
        expect(status).to.equal("connected");
    });
});