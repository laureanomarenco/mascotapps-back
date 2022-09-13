import { Op } from "sequelize";
import { Router } from "express";
import db from "../../models/index";

const router = Router();

router.get("/", async (req,res)=>{
    const {input} = req.body
    try {
      const searchedPets = await db.Animal.findAll({
        where:{
          name:{
            [Op.iLike]: '%' +  input + '%'
          },
        }
      })
      const searchedPetsRace = await db.Animal.findAll({
        where:{
          race:{
            [Op.iLike]: '%' + input + '%'
          },
        }
      })
      const allPets = searchedPets.concat(searchedPetsRace)
      res.send(allPets)
    } catch (error: any) {
      return res.status(400).send(error)
    }
  })

export default router