import { Op } from "sequelize";
import { Router } from "express";
import db from "../../models/index";

const router = Router();

router.get("/", async (req,res)=>{
    const {input} = req.body
    try {
      const searchedPets = db.animal.findAll({
        where:{
          name:{
            [Op.iLike]: '%' + input + '%'
          },
          race:{
            [Op.iLike]: '%' + input + '%'
          }
        }
      })
      res.send(searchedPets)
    } catch (error: any) {
      return res.status(400).send(error)
    }
  })

export default router