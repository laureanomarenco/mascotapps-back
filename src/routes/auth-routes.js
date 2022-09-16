const router = require("express").Router();
const passport = require("passport");

//auth login:
router.get("/login", (req, res) => {
  res.render("login", { usuario: req.user });
});

//auth logout
router.get("/logout", (req, res) => {
  //#20: simplemente un req.logout(), lo cual destruye la parte del id encriptado de la cookie, y después redirijo
  req.logout();
  res.redirect("/");
});

//auth with google:
router.get(
  "/google",
  passport.authenticate("google", {
    //el scope le dice a passport qué datos del perfil del usuario queremos obtener
    scope: ["profile", "email"], //acá uno dice que no tiene que estar adentro de un array si quiero poner más de dos en scope, si no que tiene que ser scope: "profile email", successRedirect: "/", failureRedirect: "/login"
  })
);

// callback route for google to redirect to
// entra a esta ruta cuando google me redirecciona, completando la URL/URI con el code que completan en la query de la URL
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log("ESTOY DESPUÉS DEL MIDDLEWARE DE AUTHTENTICATE");
  //#17 Ahora en este req me va a llegar el user en req.user:
  // res.send(req.user);
  // res.send("you reached the callback URI");
  //#18 Voy a redirigir y enviar al cliente a una URL particular. Por ejemplo, a /profile. Hago un archivo con las rutas para el perfil.
  res.redirect("/profile/");
});

module.exports = router;
