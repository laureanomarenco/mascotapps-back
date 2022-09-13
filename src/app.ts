import express from "express";
import usersRouter from "./routes/users";
import animalRouter from "./routes/pets";
import searchBar from "./routes/searchBar"
// import db from "./src/models";
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/ping", (_req, res) => {
  // le puse el guión bajo al req para decirle a typescript que ignore el hecho de que no uso esa variable req.
  console.log("Someone pinged here!!!");
  res.send("pong");
});

app.use("/users", usersRouter);
app.use("/pets", animalRouter);
app.use("/searchBar", searchBar)

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
