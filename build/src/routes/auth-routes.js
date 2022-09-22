"use strict";
const router = require("express").Router();
const passport = require("passport");
//auth login:
router.get("/login", (req, res) => {
    res.status(200).send(req.user);
    // res.render("login", { usuario: req.user });
});
//auth logout
router.get("/logout", (req, res) => {
    //#20: simplemente un req.logout(), lo cual destruye la parte del id encriptado de la cookie, y después redirijo
    req.logout();
    res.redirect("/");
});
//auth with google:
router.get("/google", passport.authenticate("google", {
    //el scope le dice a passport qué datos del perfil del usuario queremos obtener
    scope: ["profile", "email"], //acá uno dice que no tiene que estar adentro de un array si quiero poner más de dos en scope, si no que tiene que ser scope: "profile email", successRedirect: "/", failureRedirect: "/login"
}));
// callback route for google to redirect to
// entra a esta ruta cuando google me redirecciona, completando la URL/URI con el code que completan en la query de la URL
router.get("/google/redirect", passport.authenticate("google", {
    failureRedirect: "https://mascotapps.vercel.app",
}), (req, res) => {
    console.log("ESTOY DESPUÉS DEL MIDDLEWARE DE AUTHTENTICATE");
    //#17 Ahora en este req me va a llegar el user en req.user:
    // res.send(req.user);;
    console.log(req.user);
    res.send("you reached the callback URI");
    // res.redirect("https://mascotapps.vercel.app/account");
    // res.redirect("https://mascotapps.vercel.app/home");
    //#18 Voy a redirigir y enviar al cliente a una URL particular. Por ejemplo, a /profile. Hago un archivo con las rutas para el perfil.
    // res.redirect("/profile/");
});
const authCheck = (req, res, next) => {
    //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
    console.log("AUTHCHECK DE PROFILE!");
    console.log(req.user);
    if (!req.user) {
        res.status(200).send({ isLogged: false });
    }
    else {
        console.log("continuando con el siguiente middleware porque el req.user existe");
        next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
    }
};
router.get("/logged_in", authCheck, (req, res) => {
    console.log("ESTOY EN LA RUTA LOGGED IN");
    try {
        return res.status(200).send({ isLogged: true });
    }
    catch (error) {
        console.log(`Error en la ruta /logged_in. Error message: ${error.message}`);
        return res.status(404).send(error.message);
    }
});
//------- RUTAS QUE REQUIEREN AUTHENTICACIÓN/AUTORIZACIÓN: ------
// Todas estas rutas deberían extenderse de un "/auth/" ?
// POST de mascota, ascociada al user.id que está autenticandose.
// DELETE de mascota, ascociada al user.id que está autenticandose.
// GET datos de contacto de un User dueño de X pet.id. Mirar en la instancia de la mascota con el :id que llega por params, y de ahí sacamos el ID del dueño/posteador de esa Pet. Y con ese id buscamos a el User en la tabla de Users y obtenemos los datos de contacto (displayName, email, additionaContactInfo, etc).
// GET datos de perfíl de un usuario. Sólo el user.id que hace el GET puede acceder a los datos de user.id. El user.id me va a llegar en req.user gracias a Passport.
// GET de las mascotas asociadas a un user.id. Esto sirve para poder mostrar en el perfíl del usuario los posteos/mascotas que tiene hechos el User. Y desde ahí le vamos a dar opciones de modificar (PUT) datos de esa instancia que creó.
// PUT de los datos de una mascota, que tienen que estar asociadas/belongsTo al user.id que quiere hacer el PUT. Acá le permitimos al usuario cambiar, por ejemplo, el Status de la mascota que posteó. O cambiar el name o comments por ejemplo.
// PUT de los datos del user (EXCEPTO SU ID!!!). El user.id que llega por req.user (cookie?) está autorizado a hacer un PUT únicamente a la instancia del modelo de User que coincide con su ID. Acá podría modificar sus datos de contacto, su nombre, agregar info adicional, actualizar su thumbnail, etc.
module.exports = router;
