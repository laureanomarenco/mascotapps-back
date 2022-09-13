import { Op } from "sequelize";
import { Router } from "express";
import db from "../../models/index";

const router = Router();

router.get("/", async (req,res)=>{
    const {name} = req.body
    console.log(name)
    try {
      const searchedPets = await db.Animal.findAll({
        where:{
          name:{
            [Op.iLike]: '%' + name + '%'
          },
        }
      })
      res.send(searchedPets)
    } catch (error: any) {
      return res.status(400).send(error)
    }
  })

export default router