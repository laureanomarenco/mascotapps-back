const express = require("express");
const app = express();

const { auth, requiresAuth } = require("express-openid-connect");

app.use(
  auth({
    authRequired: false,
  })
);

// Anyone can access the homepage
app.get("/authprueba", (req: any, res: any) => {
  res.send('<a href="/admin">Admin Section</a>');
});

// requiresAuth checks authentication.
app.get("/admin", requiresAuth(), (req: any, res: any) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
);
