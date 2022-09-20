// const { default: db } = require("../../models");
import db from "../../models/index";
const passport = require("passport");

const router = require("express").Router(); //#18. Esta instancia de router va a controlar las rutas de /profile/

//#18: Creo una función para manejar en caso de que el usuario quiera acceder a /profile/ sin estar logueado.
//Acá abajo voy a crear un "middleware" que s elo voy a pasar a la ruta get "/", similar a como hicimos en auth-routes.js en el router.get("/google/redirect", middlewareDePassportAuthenticate("google")). Un middleware lo que hace es ejecutar una función antes de que se ejecute el siguiente argumento (arrow function con (req,res)).
const authCheck = (req, res, next) => {
  //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
  console.log("AUTHCHECK DE PROFILE!");
  console.log(req.user);
  if (!req.user) {
    console.log("RESPONDIENDO CON UN STRING:");
    return res.status(200).send({ displayName: "Soy el USER HARDCODEADO!" });
    // console.log("redirigiendo a https://mascotapps.vercel.app/");
    // res.redirect("https://mascotapps.vercel.app/");
  } else {
    console.log("continuando con el siguiente middleware");
    next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
  }
};

//! en esta ruta podría hacer que si pasa la authenticación, por lo que me llegaría por req.user los datos del usuario, le respondo al front con un:
// return res.status(200).send(req.user);
router.get("/", passport.authenticate("google"), async (req, res) => {
  try {
    console.log(
      `En ruta /profile. El user.displayName es: ${req?.user?.displayName}`
    );
    // buscar los datos de este user id en la DB y devolver los datos de esa instancia:
    let userID = req.user.id;
    let userDataInDB = await db.User.findByPk(userID);
    console.log(`User encontrado por id en la db:`);
    console.log(userDataInDB);
    // return res.redirect("https://mascotapps.vercel.app/account");
    return res.status(200).send(userDataInDB);
  } catch (error) {
    return res.status(404).send(error.message);
  }

  // return res.status(201).send({ authorized: true, user: req.user });
  // res.render("profile", { usuario: req.user }); //#19 en el segundo argumento le paso data que quiera enviar a render. {keyQueNoImportaElNombre: dataQueQuieroMandar}
});
//!--- experimentando misma ruta pero con distinto middleware:
// router.get("/", passport.authenticate("google"), async (req, res) => {
//   console.log("ESTOY DESPUÉS DEL MIDDLEWARE DE AUTHTENTICATE de PROFILE");
//   try {
//     console.log(
//       `En la ruta /profile. El user.displayName es: ${req?.user?.displayName}`
//     );
//     // buscar los datos de este user id en la DB y devolver los datos de esa instancia:
//     let userID = req.user.id;
//     let userDataInDB = await db.User.findByPk(userID);
//     console.log(`User encontrado por id en la db:`);
//     console.log(userDataInDB);
//     return res.status(200).send(userDataInDB);
//   } catch (error) {
//     return res.status(404).send(error.message);
//   }
// });

module.exports = router;
