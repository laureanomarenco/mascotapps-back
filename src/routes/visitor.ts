import { Router } from "express";
import db from "../../models/index";
import { visitor } from "../types/visitorTypes";

const route = Router();

route.get("/", async (req: any, res) => {
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

export default route;
