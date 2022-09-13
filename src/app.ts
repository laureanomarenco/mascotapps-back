import express from "express";
import usersRouter from "./routes/users";
<<<<<<< HEAD
import petTSRouter from "./routes/petTS";
import searchBar from "./routes/searchBar"
=======
import animalRouter from "./routes/pets";
>>>>>>> d530d909595d073e8f75bca01d80b90d0cb5a677
// import db from "./src/models";
const app = express();

app.use(express.json()); // middleware que transforma la req.body a un json

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
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
<<<<<<< HEAD
app.use("/pets", petsRouter);
app.use("/petts", petTSRouter);
app.use("/searchBar",searchBar);
=======
app.use("/pets", animalRouter);
>>>>>>> d530d909595d073e8f75bca01d80b90d0cb5a677

module.exports = app;

//! este archivo está siendo importado en index.ts de la raíz
