import chai from 'chai';
import passport from "passport";
import Googlepassport from "passport-google-oauth20";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const expect = chai.expect;

describe('Authentication Test', () => {
    
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID2,
        process.env.CLIENT_SECRET2,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN2
    });
    var access_token = "validating"
    try {
        oauth2Client.getAccessToken();
        access_token = "access token created";
    }
    catch {
        access_token = "unable to create access token";
    }

    it('Authentication for Mailing', () => {
        expect(access_token).to.equal("access token created");
    });
    var auth = "Checking authorisation";
    try{
        const GoogleStrategy = Googlepassport.Strategy;

        passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
          },
            function (accessToken, refreshToken, profile, cb) {
          
              studentModel.findOne({
                googleId: profile.id
              }, 
              );
            }
          ));  
          auth="authorised for login";
    }
    catch{
        auth="not authorised for login";
    }

    it('Authentication for Login', () => {
        expect(auth).to.equal("authorised for login");
    });
});