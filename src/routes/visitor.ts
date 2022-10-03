import { Router } from "express";
import db from "../../models/index";
import { visitor } from "../types/visitorTypes";
const { GMAIL_PASS, GMAIL_USER } = process.env;

const route = Router();

// -------- FUNCIONES AUXULIARES : -------------

// -------- RUTAS : ----------------------------------
route.get("/addVisitor", async (req: any, res) => {
  console.log(`Entré a /visitor`);
  try {
    let newVisitor: visitor = {
      id: undefined,
    };
    let newVisit = await db.Visitor.create(newVisitor);
    console.log(`Visita registrada en la DB`);
    res.send(newVisit + "juka puto");
  } catch (error: any) {
    console.log(`Error en /visitor/`);
    return error.message;
  }
});

route.get("/numbervisitors", async (req: any, res: any) => {
  console.log("Entré a /numbervisitors");
  try {
    let arrayVisitors = await db.Visitor.findAll();
    let numberOfVisitors = arrayVisitors.length;
    res.status(200).send(`${numberOfVisitors}`);
  } catch (error) {
    res.status(404).send(error);
  }
});

route.post("/mailAdmin", async (req, res) => {
  try {
    const { email, comment } = req.body;

    const nodemailer = require("nodemailer");
    console.log(GMAIL_PASS, GMAIL_USER);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "service.mascotapp@gmail.com",
      to: "service.mascotapp@gmail.com",
      subject: "Consulta sobre la página",
      html: `Llegó la siguiente consulta desde el mail ${email}: <div>${comment}</div>`,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) console.log(error);
      else console.log("Email enviado: " + info.response);
    });
  } catch (error) {
    res.status(404).send(error);
  }
});
export default route;
