import { Router } from "express";
import { Op } from "sequelize";

import db from "../../models/index";
import { validateNewPet } from "../auxiliary/AnimalValidators";
import { Pet, Species } from "../types/petTypes";
// import { Ages, Genders, Pet, Species, Status } from "../types/petTypes";

const router = Router();

// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------

function mapSpecies() {
  try {
    let speciesArray = Object.values(Species);
    return speciesArray;
  } catch (error: any) {
    console.log(`Error en fn mapSpecies(). Error message: ${error.message}`);
    return error.message;
  }
}

async function getAllPetsNotTransacted(): Promise<Pet[]> {
  try {
    let petsInOffer = await db.Animal.findAll({
      where: {
        wasTransacted: null,
      },
    });
    return petsInOffer;
  } catch (error: any) {
    return error.message;
  }
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
    console.log(
      `Error en la function getNumberOfPetsInDB. Error message: ${error.message}`
    );
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
    console.log(
      `Error en la function getPetById. Error message: ${error.message}`
    );
    return error.message;
  }
}

async function getAllDogs(): Promise<Pet[]> {
  console.log("entré a la fn getAllDogs");
  try {
    let allDogsFromDB = await db.Animal.findAll({
      where: {
        specie: "perro",
      },
    });
    console.log(`length de allDogsFromDB: ${allDogsFromDB.length}`);
    return allDogsFromDB;
  } catch (error: any) {
    console.log(`Error en la function getAllDogs. Error: ${error.message}`);
    return error.message;
  }
}

async function getAllCats(): Promise<Pet[]> {
  console.log("entré a la fn getAllCats");
  try {
    let allCatsFromDB = await db.Animal.findAll({
      where: {
        specie: "gato",
      },
    });
    console.log(`length de allCatsFromDB: ${allCatsFromDB.length}`);
    return allCatsFromDB;
  } catch (error: any) {
    console.log(
      `Error en la function getAllCats. Error message: ${error.message}`
    );

    return error.message;
  }
}

async function getAllOtherSpecie(): Promise<Pet[]> {
  console.log("entré a la fn getAllOtherSpecie");
  try {
    let allOtherSpeciesFromDB = await db.Animal.findAll({
      where: {
        specie: "otra especie",
      },
    });
    console.log(
      `length de allOtherSpeciesFromDB: ${allOtherSpeciesFromDB.length}`
    );
    return allOtherSpeciesFromDB;
  } catch (error: any) {
    console.log(
      `Error en la function getAllOtherSpecie. Error message: ${error.message}`
    );
    return error.message;
  }
}

async function getAllLost(): Promise<Pet[]> {
  console.log("entré a la fn getAllLost");
  try {
    let allLostFromDB = await db.Animal.findAll({
      where: {
        status: "perdido",
      },
    });
    console.log(`length de allLostFromDB: ${allLostFromDB.length}`);
    return allLostFromDB;
  } catch (error: any) {
    console.log(
      `Error en la function getAllLost. Error message: ${error.message}`
    );
    return error.message;
  }
}

async function getAllFound(): Promise<Pet[]> {
  console.log("entré a la fn getAllFound");
  try {
    let allFoundFromDB = await db.Animal.findAll({
      where: {
        status: "encontrado",
      },
    });
    console.log(`length de allFoundFromDB: ${allFoundFromDB.length}`);
    return allFoundFromDB;
  } catch (error: any) {
    console.log(
      `Error en la function getAllFound. Error message: ${error.message}`
    );

    return error.message;
  }
}

async function getAllInAdoption(): Promise<Pet[]> {
  console.log("Entré a la ruta getAllInAdoption");
  try {
    let allInAdoptionFromDB = await db.Animal.findAll({
      where: {
        status: "en adopción",
      },
    });
    console.log(`length de allFoundFromDB: ${allInAdoptionFromDB.length}`);
    return allInAdoptionFromDB;
  } catch (error: any) {
    console.log(
      `Error en la function getAllInAdoption. Error message: ${error.message}`
    );
    return error.message;
  }
}

async function getAllBy(input: any): Promise<Pet[]> {
  console.log(`En la function getAllByNameOrRace`);

  try {
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
    const searchedPetsSpecie = await db.Animal.findAll({
      where: {
        specie: {
          [Op.iLike]: "%" + input + "%",
        },
      },
    });
    const searchedPetsGender = await db.Animal.findAll({
      where: {
        gender: {
          [Op.iLike]: "%" + input + "%",
        },
      },
    });

    const allPets = [
      ...searchedPets,
      ...searchedPetsGender,
      ...searchedPetsRace,
      ...searchedPetsSpecie,
    ];

    return allPets;
  } catch (error: any) {
    console.log(
      `Error en la function getAllByNameOrRace. Error message: ${error.message}`
    );
    return error.message;
  }
}

async function idExistsInDataBase(id: any): Promise<boolean> {
  console.log(`Chequeando si existe el user.id "${id}" en la DB...`);
  try {
    let userInDataBase = await db.User.findByPk(id);
    if (userInDataBase) {
      console.log(`Usuario con id ${id} encontrado en la DB`);
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log(`Error en function idExistsInDataBase. ${error.message}`);
    return error.message;
  }
}

// ----- ------ ------- RUTAS :  ------ ------- -------

// aca tiene que haber validador porque solo usuarios registrados pueden acceder a esta ruta
//POST A PET:
router.post("/postNewPet", async (req: any, res) => {
  console.log(`Entré a users/postnewpet`);
  try {
    const id = req.body?.user?.id;
    if (!id) {
      throw new Error(`El Id de usuario es inválido/falso`);
    }
    if (id) {
      //chequear si existe este id de usuario registrado en la DB
      let userIsRegistered = await idExistsInDataBase(id);
      if (!userIsRegistered) {
        throw new Error(`Usuario no registrado en la DataBase.`);
      }
      let validatedPet: Pet = validateNewPet(req.body.pet);
      console.log("SOY VALIDATED PET: ");
      console.log(validatedPet);
      let createdPet = await db.Animal.create(validatedPet);
      //asociar createdPet con el userID:
      let associatedPetWithUser = await createdPet.setUser(id);
      if (createdPet) {
        console.log(`Mascota creada con éxito y asociada al User con ${id}`);
        return res.status(200).send(associatedPetWithUser);
      } else {
        console.log(
          `createdPet es falsa... no se debe haber podido crear la el post new pet.`
        );
        return res.status(400).send({ msg: "No se pudo crear el post..." });
      }
    }
  } catch (error: any) {
    console.log(`Error en /postnewpet. ${error.message}`);
    console.log(`req.body.id de la request = '${req.body.id}'`);
    return res.status(404).send(error.message);
  }
});

router.put("/update", async (req, res) => {
  console.log(`Entré a pets/update`);
  console.log(`req.body = ${req.body}`);

  try {
    const { userId } = req.body.user;
    const {
      id,
      name,
      specie,
      race,
      city,
      age,
      gender,
      status,
      vaccinationSchemeStatus,
      image,
      comments,
    } = req.body.pet;
    const newProfile = await db.Animal.update(
      {
        name,
        specie,
        race,
        city,
        age,
        gender,
        status,
        vaccinationSchemeStatus,
        image,
        comments,
      },
      {
        where: {
          id: id,
          UserId: userId,
        },
      }
    );
    res.status(200).send(newProfile);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET NUMBER OF PETS IN DB:
router.get("/numberofpetsindb", async (req, res) => {
  console.log("En route pets/numberofpets");
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
  console.log("entré al GET pets/especies");
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
  console.log("entré al GET pets/ ");
  try {
    let allThePetsNotTransacted = await getAllPetsNotTransacted();
    // console.log(allThePets);
    return res.status(200).send(allThePetsNotTransacted);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

//GET ALL DOGS
router.get("/perros", async (req, res) => {
  console.log(`Entré al GET pets/perros`);
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
  console.log(`Entré al GET pets/gatos`);
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
  console.log(`Entré al GET pets/otra`);
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
  console.log(`Entré al GET pets/perdido`);
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
  console.log(`Entré al GET pets/encontrado`);
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
  console.log(`Entré al GET pets/adopcion`);
  try {
    let allInAdoptionDB = await getAllInAdoption();
    console.log(`allInAdoptionDB.length = ${allInAdoptionDB.length}`);
    return res.status(200).send(allInAdoptionDB);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

router.get("/search", async (req, res) => {
  console.log(`Entré al GET pets/search`);
  try {
    const { input } = req.query;
    console.log(`input = ${input}`);
    let result = await getAllBy(input);
    return res.status(200).send(result);
  } catch (error: any) {
    console.log(
      `Hubo un error ruta GET pets/search. Error message: ${error.message}`
    );
    return error.message;
  }
});

//GET BY ID:
router.get("/:id", async (req, res) => {
  console.log(`Entré al GET pets/:id con params.id = ${req?.params?.id}`);
  try {
    let paramsID = req.params.id;
    let petFoundById = await getPetById(paramsID);
    return res.status(200).send(petFoundById);
  } catch (error: any) {
    console.log(`retornando error en GET pets/:id: ${error.message}`);
    return res.status(404).send(error.message);
  }
});

export default router;
