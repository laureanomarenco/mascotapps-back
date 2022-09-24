import { Router } from "express";
import db from "../../models/index";
import { IPetOfUser, Pet } from "../types/petTypes";
import {
  IContactInfoOfOwner,
  ISomeUserInfo,
  UserAttributes,
} from "../types/userTypes";

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

// get Some User Info:
async function getSomeUserInfo(userId: any) {
  console.log(`Ejecutando función auxiliar someUserInfo`);
  console.log(`userId = ${userId}`);
  try {
    let userInfo: UserAttributes = await db.User.findByPk(userId);
    if (userInfo) {
      let someUserInfo: ISomeUserInfo = {
        name: userInfo.name,
        city: userInfo.city,
        image: userInfo.image,
        contact: userInfo.contact,
        isDonator: userInfo.isDonator,
      };
      console.log(`retornando someUserInfo: ${someUserInfo}`);
      return someUserInfo;
    } else {
      throw new Error(`usuario no encontrado`);
    }
  } catch (error: any) {
    console.log(`Error en la función auxiliar someUserInfo: ${error.message}`);
    return error;
  }
}

//Parse Pets Posted By User ---> deja afuera el UserId
function parsePetsPostedByUser(petsPostedByUser: Pet[]): IPetOfUser[] {
  console.log(`En function auxiliary parsePetsPostedByUser`);
  try {
    let parsedPets: IPetOfUser[] = petsPostedByUser.map((pet) => {
      return {
        id: pet.id,
        name: pet.name,
        city: pet.city,
        specie: pet.specie,
        race: pet.race,
        age: pet.age,
        gender: pet.gender,
        status: pet.status,
        vaccinationSchemeStatus: pet.vaccinationSchemeStatus,
        image: pet.image,
        comments: pet.comments,
        withNewOwner: pet.withNewOwner,
        backWithItsOwner: pet.backWithItsOwner,
      };
    });
    console.log(
      `Retornando parsedPets. parsedPets.length = ${parsedPets.length}`
    );
    return parsedPets;
  } catch (error: any) {
    return error;
  }
}

//! ----- MIDDLEWARE PARA AUTH : ------
const authCheck = (req: any, res: any, next: any) => {
  const { id } = req.body;
  if (!id) {
    res.send({ msg: "el usuario no existe" });
  } else {
    next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta
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

// GET CONTACT INFO / PET ID
router.get("/contactinfo/:petid", async (req, res) => {
  console.log(`Entré a la ruta /users/contactinfo/:petid`);
  console.log(`:petid = ${req.params.petid}`);
  try {
    let petID = req.params.petid;
    let petInDB = await db.Animal.findByPk(petID);
    let ownerID = petInDB?.UserId;
    let ownerInDB: UserAttributes = await db.User.findByPk(ownerID);
    let contactInfoOfOwner: IContactInfoOfOwner = {
      //displayName: ownerInDB.displayName,
      name: ownerInDB.name,
      email: ownerInDB.email,
      city: ownerInDB.city,
      image: ownerInDB.image,
      contact: ownerInDB.contact,
    };
    console.log(`contactInfoOfOwner = ${contactInfoOfOwner}`);
    return res.status(200).send(contactInfoOfOwner);
  } catch (error: any) {
    console.log(`error en /contactinfo/:petid = ${error.message}`);
    return res.status(404).send(error.message);
  }
});

// GET(post) ALL PETS OF USER ID:
router.post("/getallpetsofuser", async (req: any, res) => {
  console.log(`Entré a la ruta "/users/getallpetsofuser". El req.body es =`);
  console.log(req.body);
  console.log(`user ID = ${req.body?.id}`);
  try {
    if (!req.body.id) {
      console.log(
        `Error en /users/getallpetsofuser. El req.body.id es falso/undefined`
      );
      throw new Error(
        `Error en /users/getallpetsofuser. El req.body.id es falso/undefined`
      );
    }
    let id = req.body.id;
    let petsPostedByUser: Pet[] = await db.Animal.findAll({
      where: {
        UserId: id,
      },
    });

    if (petsPostedByUser?.length > 0) {
      let parsedPetsPostedByUser: IPetOfUser[] =
        parsePetsPostedByUser(petsPostedByUser);
      return res.status(200).send(parsedPetsPostedByUser);
    } else {
      console.log(
        `Retornando petsPostedByUser con .length <= 0. Su length es ${petsPostedByUser?.length}`
      );
      return res.status(200).send(petsPostedByUser);
    }
  } catch (error: any) {
    console.log(`error en el /users/getallpetsofusers: ${error.message}`);
    console.log(error);
    return res.status(404).send(error.message);
  }
});

router.delete("/deletepet/:petid", async (req: any, res) => {
  console.log(`En la ruta users/deletepet/:petid.`);
  console.log(`:petid = ${req.body?.petid}`);
  console.log(`req.user.id = ${req.body?.id}`);
  try {
    let petID = req.body?.petid;
    let userID = req.body?.id;
    //buscar instancia de mascota en DB:
    let petToDeleteInDB = await db.Animal.findByPk(petID);
    if (petToDeleteInDB.UserId == userID) {
      //borrar instancia de la DB:
      // await petToDeleteInDB.destroy();
      let deletedPet = await petToDeleteInDB.destroy();
      console.log(
        `pet with id ${petToDeleteInDB.id} and pet.UserId = ${petToDeleteInDB.UserId}...  soft-destroyed`
      );
      return res.status(200).send(deletedPet);
    } else {
      //retornar que no coincide el petToDelete.UserId con el req.user.id
      return res
        .status(400)
        .send(`El ID del cliente no coincide con el UserId de la mascota.`);
    }
  } catch (error: any) {
    console.log(
      `Hubo un error en el users/deletepet/:petid = ${error.message}`
    );
    return res.status(404).send(error.message);
  }
});

router.post("/newuser", async (req, res) => {
  const { email, name, city, contact, image, id } = req.body;
  try {
    console.log("new user..", name);
    let [newUser, created] = await db.User.findOrCreate({
      where: {
        name,
        email,
        id,
        city,
        contact,
        image,
      },
    });
    if (!created) {
      res.status(409).send(`El usuario con id ${id} ya existe en la DB`);
    } else {
      console.log(`Nuevo usuario creado con name: ${name}`);
      res.send(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.post("/exists", async (req, res) => {
  const { id } = req.body;
  try {
    console.log(`Buscando si existe el usuario con id ${id}`);
    let user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    if (user === null) {
      console.log(`Usuario con id: ${id} no encontrado`);
      res.send({ msg: false });
    } else {
      console.log(`Usuario con id: ${id} encontrado.`);
      res.send({ msg: true });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.put("/update", async (req, res) => {
  console.log(`Entré a users/update`);
  console.log(`Me llegó por body: `);
  console.log(req.body);
  try {
    const { image, contact, city, email, name, id } = req.body;
    const newProfile = await db.User.update(
      {
        image: image,
        contact: contact,
        city: city,
        email: email,
        name: name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send(newProfile);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/someUserInfo", async (req, res) => {
  console.log(`Entré a la ruta /users/someUserInfo`);
  console.log(`req.body.id = ${req.body?.id}`);
  try {
    if (req.body.id) {
      let userId = req.body.id;
      let someUserInfo: ISomeUserInfo = await getSomeUserInfo(userId);
      console.log(`someUserInfo: ${someUserInfo}`);
      return res.status(200).send(someUserInfo);
    } else {
      throw new Error("El user Id enviado no es válido");
    }
  } catch (error: any) {
    console.log(`Error en /users/someUserInfo. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

export default router;
