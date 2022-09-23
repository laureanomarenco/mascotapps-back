import { Router } from "express";
import db from "../../models/index";
import { visitor } from "../types/visitorTypes";

const route = Router()



route.get("/", async (req: any, res) => {
      let newVisitor: visitor = {
        id: undefined,
      };
      let newVisit = await db.Visitor.create(newVisitor);
      res.send(newVisit + 'juka puto')
 }
)

route.get("/numbervisitors", async (req:any, res:any) => {
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
