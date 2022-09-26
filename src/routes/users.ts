import { Router } from "express";
import db from "../../models/index";
import { IPetOfUser, Pet } from "../types/petTypes";
import { Op } from "sequelize";
import {
  IContactInfoOfOwner,
  ISomeUserInfo,
  UserAttributes,
} from "../types/userTypes";
import { IReview } from "../types/reviewTypes";

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

const getAllReviewsRecived = async (userId: any) => {
  try {
    const allReviews = await db.Review.findAll({
      where: {
        UserId: userId,
      },
    });
    return allReviews;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

const getAllTransactions = async (userId: any) => {
  try {
    const allTransactions = await db.Transaction.findAll({
      where: {
        [Op.or]: [{ user_offering_id: userId }, { user_demanding_id: userId }],
      },
    });
    return allTransactions;
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
    return error.message;
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

//GET POSTS OF USER:
async function getPostsOfUser(id: any) {
  console.log(`Buscando los posteos de user con id: ${id}`);
  try {
    let postsOfUser = await db.Animal.findAll({
      where: {
        UserId: id,
      },
    });
    console.log(`${postsOfUser?.length} posts encontrados`);
    return postsOfUser;
  } catch (error: any) {
    return error.message;
  }
}

async function getParsedReviewsToOwner(id: string) {
  try {
    let reviewsToUser = await db.Review.findAll({
      where: {
        UserId: id,
      },
    });
    let parsedReviewsWithMoreData = parseReviewsToOwner(reviewsToUser);
    return parsedReviewsWithMoreData;
  } catch (error: any) {
    console.log(`Error en function getReviewsToOwner`);
    return error.message;
  }
}
//{
//     "id": "735be91f-1a36-4656-9ee5-4c26799108f8",
//     "transaction_id": "30a966a9-9258-4361-9c97-5ac7518f6922",
//     "reviewer_id": "google-oauth2|117088984145359825186",
//     "comments": "frdgtfhyugkhiljoñkpl",
//     "stars": 5,
//     "createdAt": "2022-09-25T21:59:40.040Z",
//     "updatedAt": "2022-09-25T21:59:40.047Z",
//     "UserId": "google-oauth2|112841257571449057358",
// reviewer_name: "nombre del que hizo la review",
// reviewer_image: "http://image.comasd/.jpg"
// },
async function parseReviewsToOwner(arrayOfReviews: any) {
  console.log(`Parseando las reviews...`);
  try {
    let parsedReviews = await arrayOfReviews.map(async (review: IReview) => {
      let reviewer = await db.User.findByPk(review.reviewer_id);
      return {
        ...review,
        reviewer_name: reviewer.name,
        reviewer_image: reviewer.image,
      };
    });
    console.log(`parsedReviews:`);
    console.log(parsedReviews);
    return parsedReviews;
  } catch (error: any) {
    console.log(`Error en el parseReviewsToOwner`);
    return error.message;
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
    if (!ownerInDB) {
      throw new Error(
        `Usuario dueño de la mascota no fue encontrado en la Data Base.`
      );
    }
    let reviewsToOwner = await getParsedReviewsToOwner(ownerID);
    let contactInfoOfOwner: IContactInfoOfOwner = {
      //displayName: ownerInDB.displayName,
      name: ownerInDB.name,
      email: ownerInDB.email,
      city: ownerInDB.city,
      image: ownerInDB.image,
      contact: ownerInDB.contact,
      isDonator: ownerInDB.isDonator,
      reviews: [...reviewsToOwner],
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

router.post("/deletePet", async (req: any, res) => {
  console.log(`En la ruta users/deletePet.`);
  console.log(`petId = ${req.body?.petId}`);
  console.log(req.body);
  console.log(`req.body.id = ${req.body?.id}`);
  try {
    let petId = req.body.petId;
    let userId = req.body.id;
    //buscar instancia de mascota en DB:
    let petToDeleteInDB = await db.Animal.findByPk(petId);
    if (petToDeleteInDB.UserId == userId) {
      //borrar instancia de la DB:
      // await petToDeleteInDB.destroy();
      let deletedPet = await petToDeleteInDB.destroy();
      console.log(`pet with id ${req.body.id} ...  soft-destroyed`);
      return res.status(200).send({ msg: "Mascota borrada" });
    } else {
      //retornar que no coincide el petToDelete.UserId con el req.user.id
      return res
        .status(400)
        .send(`El ID del cliente no coincide con el UserId de la mascota.`);
    }
  } catch (error: any) {
    console.log(`Hubo un error en el users/deletepet = ${error.message}`);
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

router.post("/getMultipleUserInfo", async (req, res) => {
  console.log(`Entré a la ruta /users/getMultipleUserInfo`);
  console.log(`req.body.id = ${req.body.id}`);
  try {
    if (req.body.id) {
      let userId = req.body.id;
      let someUserInfo: ISomeUserInfo = await getSomeUserInfo(userId); //obj con props
      let userReviewsRecived = await getAllReviewsRecived(userId); //arreglo de objs
      let userTransactions = await getAllTransactions(userId); //arreglo de objs
      let postsOfUser = await getPostsOfUser(userId); //arreglo de objs
      console.log(`Devolviendo multipleUserInfo...`);
      //! TODO ESTO PODRÏA ESTAR ADENTRO DE UN Promise.all() ?? Sería mejor?
      const multipleUserInfo = {
        userProps: { ...someUserInfo },
        reviews: [...userReviewsRecived],
        transactions: [...userTransactions],
        posts: [...postsOfUser],
      };
      return res.status(200).send(multipleUserInfo);
    } else {
      throw new Error(`El id '${req.body.id}' es falso.`);
    }
  } catch (error: any) {
    console.log(`Error en /users/getMultipleUserInfo. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

export default router;
