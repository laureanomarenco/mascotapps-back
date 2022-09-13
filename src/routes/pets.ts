import { Router } from "express";
import db from "../../models/index";
import { validateNewPet } from "../auxiliary/AnimalValidators";
import { Pet } from "../types/petTypes";
// import { Ages, Genders, Pet, Species, Status } from "../types/petTypes";

const router = Router();

// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------

const getAllPets = async () => {
  try {
    const allPets = await db.Animal.findAll();
    // console.log(allPets);
    return allPets;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

async function getPetById(id: string | undefined) {
  console.log(`fn getById; id: ${id}`);
  try {
    let petFoundById = await db.Animal.findByPk(id);
    console.log(`petFoundById: ${petFoundById}`);
    console.log(`${petFoundById.name}`);
    return petFoundById;
  } catch (error: any) {
    return error.message;
  }
}

// ----- ------ ------- RUTAS :  ------ ------- -------

//POST A PET:
router.post("/", async (req, res) => {
  console.log("entré al POST de Animal!");
  try {
    let validatedPet: Pet = validateNewPet(req.body);
    console.log("SOY VALIDATED PET: ");
    console.log(validatedPet);

    let createdPet = await db.Animal.create(validatedPet);
    return res.status(200).send(createdPet);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET ALL PETS:
router.get("/", async (_req, res) => {
  console.log("entré al get de pets!");

  try {
    let allThePets = await getAllPets();
    // console.log(allThePets);
    return res.status(200).send(allThePets);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET BY ID:
router.get("/:id", async (req, res) => {
  let paramsID = req.params.id;
  console.log(`entré a get by id con params.id = ${req.params.id}`);
  try {
    let petFoundById = await getPetById(paramsID);
    return res.status(200).send(petFoundById);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

export default router;
