// passport-setup.js:
const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config.js")[env];
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
import db from "../models/index";
import { validateNewUser } from "../src/auxiliary/UserValidators";
//app.ts:
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
// import { validateNewUser } from "./auxiliary/UserValidators";
import { UserAttributes } from "../src/types/userTypes";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user: any, done: any) => {
  console.log("ESTOY EN EL SERIALIZE USER");
  console.log(`User id = ${user.id}`);
  console.log(`User displayName: ${user.displayName}`);
  //le paso el id que crea la DB, y NO la id de google.
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  console.log("ESTOY EN EL DESERIALIZE USER");
  console.log("Soy el id adentro de deserializeUser:");
  console.log(id);

  db.User.findByPk(id).then((user: any) => {
    done(null, user);
    // lo que hace este done es meterle una key "user" al objeto req de la ruta app.get("/")
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/redirect",
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      console.log(`GoogleStrategy callback disparada...`);
      console.log(`Soy el profile:`);
      console.log(profile);
      try {
        //esta función corre cuando hay una autenticación exitosa!
        //Las funciones cb() lo que hacen es decirle a Passport "to move on and go to the next step". Le pasamos algunos params para el próximo paso también.
        let userInDB = await db.User.findOne({
          where: {
            googleId: profile.id,
          },
        });
        if (!userInDB) {
          console.log(`User in DB no encontrado. Creando uno nuevo...`);
          let validatedUser: UserAttributes = validateNewUser(profile);
          console.log("usuario validado correctamente y listo para crearse...");
          let createdUser = await db.User.create(validatedUser);
          console.log(`Nuevo usuario creado: `);
          console.log(createdUser);
          cb(null, createdUser);
        } else {
          cb(null, userInDB);
        }
      } catch (error: any) {
        console.log(`Error en el Google Stgy callback: ${error.message}`);
        return error.message;
      }
    }
  )
);
