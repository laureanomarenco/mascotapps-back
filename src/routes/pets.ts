import { Router } from "express";
import { Op } from "sequelize";

import db from "../../models/index";
import { validateNewPet } from "../auxiliary/AnimalValidators";
import { Pet, Species } from "../types/petTypes";
// import { Ages, Genders, Pet, Species, Status } from "../types/petTypes";

const router = Router();

// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------

function mapSpecies() {
  let speciesArray = Object.values(Species);
  return speciesArray;
}

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

async function getNumberOfPetsInDB(): Promise<number> {
  console.log("En la fn getNumberOfPetsInDB");
  try {
    let allPetsInDB = await getAllPets();
    let numberOfPetsInDB = allPetsInDB.length;
    console.log(`numberOfPetsInDB: ${numberOfPetsInDB}`);

    return numberOfPetsInDB;
  } catch (error: any) {
    return error.message;
  }
}

async function getPetById(id: string | undefined) {
  console.log(`fn getById; id: ${id}`);
  try {
    let petFoundById = await db.Animal.findByPk(id);
    console.log(`petFoundById: ${petFoundById}`);
    console.log(`${petFoundById?.name}`);
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

async function getAllFound(): Promise<Pet[]> {
  console.log("entré a la fn getAllFound");
  let allFoundFromDB = await db.Animal.findAll({
    where: {
      status: "encontrado",
    },
  });
  console.log(`length de allFoundFromDB: ${allFoundFromDB.length}`);
  return allFoundFromDB;
}

async function getAllInAdoption(): Promise<Pet[]> {
  console.log("Entré a la ruta getAllInAdoption");
  let allInAdoptionFromDB = await db.Animal.findAll({
    where: {
      status: "en adopción",
    },
  });
  console.log(`length de allFoundFromDB: ${allInAdoptionFromDB.length}`);
  return allInAdoptionFromDB;
}

async function getAllByNameOrRace(input: any): Promise<Pet[]> {
  const searchedPets = await db.Animal.findAll({
    where: {
      name: {
        [Op.iLike]: "%" + input + "%",
      },
    },
  });
  const searchedPetsRace = await db.Animal.findAll({
    where: {
      race: {
        [Op.iLike]: "%" + input + "%",
      },
    },
  });
  const allPets = searchedPets.concat(searchedPetsRace);

  return allPets;
}

//! ----- MIDDLEWARE PARA AUTH : ------

const authCheck = (req: any, res: any, next: any) => {
  //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
  console.log("EN EL authCheck!");
  console.log(req.user);
  if (!req.user) {
    console.log("redirigiendo al /auth/login");
    res.redirect("/auth/login");
  } else {
    console.log("continuando con el siguiente middleware");
    next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
  }
};

//! ruta de prueba con authCheck:

router.get("/secretos", authCheck, async (req, res) => {
  console.log("en /secretos");
  try {
    let allCats = await getAllCats();
    return res.status(200).send(allCats);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

// ----- ------ ------- RUTAS :  ------ ------- -------

// aca tiene que haber validador porque solo usuarios registrados pueden acceder a esta ruta
//POST A PET:
router.post("/", async (req, res) => {
  console.log("entré al POST de Animal!");
  try {
    let validatedPet: Pet = validateNewPet(req.body);
    console.log("SOY VALIDATED PET: ");
    console.log(validatedPet);

    let createdPet = await db.Animal.create(validatedPet);
    return res.status(201).send(createdPet);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

// GET NUMBER OF PETS IN DB:
router.get("/numberofpetsindb", async (req, res) => {
  console.log("En route /numberofpets");
  try {
    let numberOfPetsInDB = await getNumberOfPetsInDB();
    let numberOfPetsInDBtoString = `${numberOfPetsInDB}`;
    return res.status(200).send(numberOfPetsInDBtoString);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET ALL SPECIES:
router.get("/especies", async (_req, res) => {
  console.log("entré al GET all species");
  try {
    let speciesArray = mapSpecies();
    console.log(`species Array = ${speciesArray}`);
    return res.status(200).send(speciesArray);
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

//GET ALL FOUND
router.get("/encontrado", async (req, res) => {
  console.log(`Entré al GET /encontrado`);
  try {
    let allFoundFromDB = await getAllFound();
    console.log(`allFoundFromDB.length = ${allFoundFromDB.length}`);
    return res.status(200).send(allFoundFromDB);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET ALL IN ADOPTION
router.get("/adopcion", async (req, res) => {
  console.log(`Entré al GET /adopcion`);
  try {
    let allInAdoptionDB = await getAllInAdoption();
    console.log(`allInAdoptionDB.length = ${allInAdoptionDB.length}`);
    return res.status(200).send(allInAdoptionDB);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

router.get("/search", async (req, res) => {
  const { input } = req.query;
  let result = await getAllByNameOrRace(input);
  return res.json(result);
});

//GET BY ID:
router.get("/:id", async (req, res) => {
  let paramsID = req.params.id;
  console.log(`entré a get by id con params.id = ${req.params.id}`);
  try {
    let petFoundById = await getPetById(paramsID);
    return res.status(200).send(petFoundById);
  } catch (error: any) {
    console.log(`retornando error en GET /:id: ${error.message}`);
    return res.status(404).send(error.message);
  }
});

export default router;
