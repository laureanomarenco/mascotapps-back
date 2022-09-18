import { Router } from "express";
import db from "../../models/index";
import { validateNewPet } from "../auxiliary/AnimalValidators";
import { Pet } from "../types/petTypes";
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

//GET ALL USERS FROM DB:  //! Hay que dejarla comentada ( o borrarla) porque no es seguro poder tener toda la data de los users registrados:
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

// GET NUMBER OF USERS IN DB:

router.get("/numberOfUsersInDB", async (req, res) => {
  console.log("Entré a la route /numberOfUsersInDB");
  try {
    let allUsersInDB = await getAllUsers();
    let numberOfUsersInDB = allUsersInDB.length;
    let numberOfUsersInDBtoString = `${numberOfUsersInDB}`;
    return res.status(200).send(numberOfUsersInDBtoString);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//! ----- MIDDLEWARE PARA AUTH : ------
const authCheck = (req: any, res: any, next: any) => {
  //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
  console.log("En el authCheck de /users");
  console.log(req?.user);
  if (!req.user) {
    console.log("redirigiendo al /auth/google");
    res.redirect("/auth/google");
  } else {
    console.log("Usuario autenticado (req.user existe)");
    console.log("continuando con el siguiente middleware");
    next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
  }
};

//POST NEW PET:
// validar usuario que sea uno registrado.
// obtener su ID que lo voy a usar para asociarlo a la new pet.
// obtener el req.body que va a tener los datos de la new pet.
// validar el req.body antes de crear el new pet en la DB.
// crear la validatedPet en la DB
// asociar la validatedPet con el userID del que la posteó
//! retonar la associatedPetWithUser o la createdPet?????
router.post("/postnewpet", authCheck, async (req: any, res) => {
  console.log(`Entré a users/postnewpet`);
  try {
    console.log(`req.user es = ${req?.user}`);
    let userID = req.user.id;
    console.log(`userID = ${userID}`);
    console.log(`req.body = `);
    console.log(req.body);
    let validatedPet: Pet = validateNewPet(req.body);
    console.log("SOY VALIDATED PET: ");
    console.log(validatedPet);
    let createdPet = await db.Animal.create(validatedPet);
    //asociar createdPet con el userID:
    let associatedPetWithUser = await createdPet.setUser(userID);
    return res.status(200).send(associatedPetWithUser);
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

// Hacer más rutas

export default router;
