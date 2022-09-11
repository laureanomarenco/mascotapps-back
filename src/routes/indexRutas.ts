// import express from "express";
// // import diaryRouter from "./diares";
// import usersRouter from "./users";
// import petsRouter from "./pets";

// const app = express();
// app.use(express.json()); // middleware que transforma la req.body a un json
// const PORT = 3001;

// app.use((_req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// app.get("/ping", (_req, res) => {
//   // le puse el guión bajo al req para decirle a typescript que ignore el hecho de que no uso esa variable req.
//   console.log("Someone pinged here!!!");
//   res.send("pong");
// });

// // app.use("/api/diaries", diaryRouter);
// app.use("/api/users", usersRouter);
// app.use("/pets", petsRouter);
// app.use("/users", usersRouter);

// app.listen(PORT, () => {
//   console.log(`Server corriendo en el puerto ${PORT}`);
// });

// ! este archivo quedó en la nada. Al final el archivo app.ts que está en /src es el que reúne todas las rutas. Este podría ser borrado sin consecuencias, pero lo dejo por si termino usandolo para modularizar algo acá.
