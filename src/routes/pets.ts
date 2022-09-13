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

async function getAllDogs(): Promise<Pet[]> {
  console.log("entré a la fn getAllDogs");
  let allDogsFromDB = await db.Animal.findAll({
    where: {
      specie: "perro",
    },
  });
  console.log(`length de allDogsFromDB: ${allDogsFromDB.length}`);
  return allDogsFromDB;
}

async function getAllCats(): Promise<Pet[]> {
  console.log("entré a la fn getAllCats");
  let allCatsFromDB = await db.Animal.findAll({
    where: {
      specie: "gato",
    },
  });
  console.log(`length de allCatsFromDB: ${allCatsFromDB.length}`);
  return allCatsFromDB;
}

async function getAllOtherSpecie(): Promise<Pet[]> {
  console.log("entré a la fn getAllOtherSpecie");
  let allOtherSpeciesFromDB = await db.Animal.findAll({
    where: {
      specie: "otra especie",
    },
  });
  console.log(
    `length de allOtherSpeciesFromDB: ${allOtherSpeciesFromDB.length}`
  );
  return allOtherSpeciesFromDB;
}

async function getAllLost(): Promise<Pet[]> {
  console.log("entré a la fn getAllLost");
  let allLostFromDB = await db.Animal.findAll({
    where: {
      status: "perdido",
    },
  });
  console.log(`length de allLostFromDB: ${allLostFromDB.length}`);
  return allLostFromDB;
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

//GET ALL DOGS
router.get("/perros", async (req, res) => {
  console.log(`Entré al GET /perros`);
  try {
    let dogsFromDB = await getAllDogs();
    console.log(`dogsFromDB.length = ${dogsFromDB.length}`);
    return res.status(200).send(dogsFromDB);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET ALL CATS
router.get("/gatos", async (req, res) => {
  console.log(`Entré al GET /gatos`);
  try {
    let catsFromDB = await getAllCats();
    console.log(`catsFromDB.length = ${catsFromDB.length}`);
    return res.status(200).send(catsFromDB);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET ALL OTHER SPECIES
router.get("/otra", async (req, res) => {
  console.log(`Entré al GET /otra`);
  try {
    let otherSpeciesFromDB = await getAllOtherSpecie();
    console.log(`otherSpeciesFromDB.length = ${otherSpeciesFromDB.length}`);
    return res.status(200).send(otherSpeciesFromDB);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET ALL LOST
router.get("/perdido", async (req, res) => {
  console.log(`Entré al GET /perdido`);
  try {
    let allLostFromDB = await getAllLost();
    console.log(`allLostFromDB.length = ${allLostFromDB.length}`);
    return res.status(200).send(allLostFromDB);
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
