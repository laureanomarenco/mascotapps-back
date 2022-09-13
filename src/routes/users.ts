import { Router } from "express";
import db from "../../models/index";
// import axios from "axios";
//import { UserAttributes } from "../../models/user"
const router = Router();

// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------

const getAllUsers = async () => {
  try {
    const allUsers = await db.User.findAll();
    // console.log(allUsers);
    return allUsers;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

// ----- ------ ------- RUTAS :  ------ ------- -------
router.get("/", async (req, res) => {
  console.log("entré al get de Users!");

  try {
    let allTheUsers = await getAllUsers();
    // console.log(allTheUsers);

    return res.status(200).send(allTheUsers);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     let validatedPet: UserAttributes = validateNewUser(req.body);

//     let createdPet = await db.User.create(validatedUser);
//     return res.status(200).send(createdPet);
//   } catch (error: any) {
//     return res.status(404).send(error.message);
//   }
// })

export default router;
