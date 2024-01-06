"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
var passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
var passport_facebook_1 = __importDefault(require("passport-facebook"));
var passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var GOOGLE_ID = process.env.GOOGLE_ID || "";
var GOOGLE_SECRET = process.env.GOOGLE_SECRET || "";
var FACE_ID = process.env.FACE_ID || "";
var FACE_SECRET = process.env.FACE_SECRET || "";
var GoogleStrategy = passport_google_oauth20_1.default.Strategy;
var FacebookStrategy = passport_facebook_1.default.Strategy;
var a = 1;
function baseProcess(medio) {
    return function (accessToken, refreshToken, profile, done) {
        //console.log("Conectado google",profile)
        var data = {};
        data.name = profile._json.name;
        data.email = profile._json.email;
        data.medio = medio;
        data.id = profile._json.id || profile._json.sub;
        done(null, data);
    };
}
var GoogleInstance = new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "https://login-4sme.onrender.com/auth/google/redirect",
    scope: ['profile', 'email']
}, baseProcess("Google"));
var FacebookInstance = new FacebookStrategy({
    clientID: FACE_ID,
    clientSecret: FACE_SECRET,
    callbackURL: "https://login-4sme.onrender.com/auth/facebook/redirect",
    profileFields: ['id', 'displayName', 'email', 'gender']
}, baseProcess("Facebook"));
passport_1.default.serializeUser(function (user, done) { done(null, user); });
passport_1.default.deserializeUser(function (user, done) { done(null, user); });
passport_1.default.use(FacebookInstance);
passport_1.default.use(GoogleInstance);
