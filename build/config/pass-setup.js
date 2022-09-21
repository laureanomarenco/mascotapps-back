"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// passport-setup.js:
const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config.js")[env];
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const index_1 = __importDefault(require("../models/index"));
const UserValidators_1 = require("../src/auxiliary/UserValidators");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.serializeUser((user, done) => {
    console.log("ESTOY EN EL SERIALIZE USER");
    console.log(`User id = ${user.id}`);
    console.log(`User displayName: ${user.displayName}`);
    //le paso el id que crea la DB, y NO la id de google.
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    console.log("ESTOY EN EL DESERIALIZE USER");
    console.log("Soy el id adentro de deserializeUser:");
    console.log(id);
    index_1.default.User.findByPk(id).then((user) => {
        done(null, user);
        // lo que hace este done es meterle una key "user" al objeto req de la ruta app.get("/")
    });
});
passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/auth/google/redirect",
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`GoogleStrategy callback disparada...`);
        console.log(`Soy el profile:`);
        console.log(profile);
        try {
            //esta función corre cuando hay una autenticación exitosa!
            //Las funciones cb() lo que hacen es decirle a Passport "to move on and go to the next step". Le pasamos algunos params para el próximo paso también.
            let userInDB = yield index_1.default.User.findOne({
                where: {
                    googleId: profile.id,
                },
            });
            if (!userInDB) {
                console.log(`User in DB no encontrado. Creando uno nuevo...`);
                let validatedUser = (0, UserValidators_1.validateNewUser)(profile);
                console.log("usuario validado correctamente y listo para crearse...");
                let createdUser = yield index_1.default.User.create(validatedUser);
                console.log(`Nuevo usuario creado: `);
                console.log(createdUser);
                cb(null, createdUser);
            }
            else {
                cb(null, userInDB);
            }
        }
        catch (error) {
            console.log(`Error en el Google Stgy callback: ${error.message}`);
            return error.message;
        }
    });
}));
