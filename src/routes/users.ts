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
import { requiresAuth } from "express-openid-connect";
const { GMAIL_PASS, GMAIL_USER } = process.env;

const router = Router();
const multiplierPoints = 1;
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
        isAdopter: userInfo.isAdopter,
        gaveUpForAdoption: userInfo.gaveUpForAdoption,
        foundAPet: userInfo.foundAPet,
        gotAPetBack: userInfo.gotAPetBack,
        points: userInfo.points,
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
        postStatus: pet.postStatus,
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
    let parsedReviewsWithMoreData = await parseReviewsToOwner(reviewsToUser);
    return parsedReviewsWithMoreData;
  } catch (error: any) {
    console.log(`Error en function getReviewsToOwner`);
    return error.message;
  }
}

function parseReviewerName(reviewerName: any) {
  console.log(`Parseando reviewer name`);
  try {
    if (!reviewerName) {
      return "Anónimo";
    } else {
      return reviewerName;
    }
  } catch (error: any) {
    console.log(`Error en el parseReviewerName. ${error.message}`);
    return error.message;
  }
}

function parseReviewerImage(reviewerImage: any) {
  try {
    if (!reviewerImage) {
      return "https://www.utas.edu.au/__data/assets/image/0013/210811/varieties/profile_image.png";
    } else {
      return reviewerImage;
    }
  } catch (error: any) {
    console.log(`Error en la function parseReviewerImage. ${error.message}`);
    return error.message;
  }
}

async function parseReviewsToOwner(arrayOfReviews: any) {
  console.log(`Parseando las reviews...`);
  // console.log(arrayOfReviews);
  try {
    let parsedReviews = await Promise.all(
      arrayOfReviews.map(async (review: any) => {
        // console.log("review:");
        // console.log(review);
        let reviewer = await db.User.findByPk(review.reviewer_id);
        // console.log(reviewer.name);
        // console.log(reviewer.image);
        return {
          id: review.dataValues.id,
          transaction_id: review.dataValues.transaction_id,
          reviewer_id: review.dataValues.reviewer_id,
          comments: review.dataValues.comments,
          starts: review.dataValues.stars,
          createdAt: review.dataValues.createdAt,
          updatedAt: review.dataValues.updatedAt,
          UserId: review.dataValues.UserId,
          reviewer_name: parseReviewerName(reviewer?.name),
          reviewer_image: parseReviewerImage(reviewer?.image),
        };
      })
    );
    console.log(`Devolviendo las parsedReviews:`);
    // console.log(parsedReviews);
    return parsedReviews;
  } catch (error: any) {
    console.log(`Error en el parseReviewsToOwner. ${error.message}`);
    return error.message;
  }
}

// EMAIL EXISTS IN DATABASE:
async function emailExistsInDB(emailFromReq: any): Promise<boolean> {
  console.log(`Chequeando si el email "${emailFromReq} existe en la DB`);
  try {
    let userWithEmail = await db.User.findOne({
      where: {
        email: emailFromReq,
      },
    });
    if (userWithEmail) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log(`Error en function emailExistsInDB`);
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
router.get("/getallpetsofuser", requiresAuth(), async (req: any, res) => {
  console.log(`Entré a la ruta "/users/getallpetsofuser". El req.body es =`);
  // console.log(req.body);
  console.log(`user ID = ${req.body?.id}`);
  console.log(`req.oidc.user =`);
  console.log(req.oidc.user);

  try {
    let idFromOIDC = req?.oidc?.user.sub;
    if (!idFromOIDC) {
      console.log(
        `Error en /users/getallpetsofuser. El req.oidc.sub es falso/undefined`
      );
      throw new Error(
        `Error en /users/getallpetsofuser. El req.oidc.sub es falso/undefined`
      );
    }
    // let id = req.body.id;
    let petsPostedByUser: Pet[] = await db.Animal.findAll({
      where: {
        UserId: idFromOIDC,
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
  console.log(`Entré en /user/newUser`);
  const { email, name, city, contact, image, id } = req.body;
  try {
    let emailExisteEnLaDB = await emailExistsInDB(email);
    if (emailExisteEnLaDB) {
      throw new Error(
        `El email ${email} ya está registrado. Por favor, use otro email para el registro.`
      );
    }
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
      res.status(200).send(newUser);
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(404).send(error.message);
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

router.get("/ranking", async (req, res) => {
  console.log(`Estoy en /users/ranking.`);
  try {
    let allTheUsers = await getAllUsers();

    const ranking = allTheUsers.sort(function (a: any, b: any) {
      return b.points - a.points;
    });

    const topTen = ranking.slice(0, 9);

    res.status(200).send(topTen);
  } catch (error: any) {
    console.log(`Error en /users/ranking. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

router.post("/points", async (req, res) => {
  console.log(`Estoy en /users/points.`);
  try {
    const { id } = req.body;
    const user = await db.User.findOne({ where: { id: id } });
    if (user) {
      return res.status(200).send({ points: user.points });
    }
    return res.status(200).send("no existe el usuario");
  } catch (error: any) {
    console.log(`Error en /users/points ${error.message}`);
    return res.status(400).send(error.message);
  }
});

router.get("/rankingGaveAdoption", async (req, res) => {
  console.log(`Estoy en /users/rankingGaveAdoption.`);
  try {
    let allTheUsers = await getAllUsers();

    const ranking = allTheUsers.sort(function (a: any, b: any) {
      return b.gaveUpForAdoption - a.gaveUpForAdoption;
    });

    const topTen = ranking.slice(0, 9);

    res.status(200).send(topTen);
  } catch (error: any) {
    console.log(`Error en /users/rankingGaveAdoption. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

router.post("/buyProducts", async (req, res) => {
  console.log(`Estoy en /users/buyProducts.`);
  try {
    const { userID, name, items, totalPoints, mail, direccion } = req.body;

    const user = await db.User.findOne({ where: { id: userID } });
    if (user) {
      console.log(user, totalPoints, items);
      user.points = user.points - totalPoints;
      await user.save();

      const nodemailer = require("nodemailer");
      console.log(GMAIL_PASS, GMAIL_USER);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS,
        },
      });

      const msgMail = `Hola ${name} estamos preparando tu compra para enviarla a ${direccion}. Te daremos aviso cuando el producto esté en camino.`;

      const mailOptions = {
        from: "service.mascotapp@gmail.com",
        to: mail,
        subject: "Tu compra está siendo preparada",
        html: `<div>${msgMail}</div><div>Productos: ${items.map((i: any) => {
          return i.title;
        })}</div><div>Puntos: ${totalPoints}</div><div>Muchas gracias de parte del equipo de mascotapp.</div>`,
      };

      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) console.log(error);
        else console.log("Email enviado: " + info.response);
      });

      return res.status(200).send("compra realizada exitosamente");
    }
    return res.send("el usuario no existe");
  } catch (error: any) {
    console.log(`Error en /users/buyProducts. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

router.post("/donatePoints", async (req, res) => {
  console.log(`Estoy en /users/donatePoints.`);
  try {
    const { id, idToDonate, pointsToDonate } = req.body;
    const user = await db.User.findOne({ where: { id: id } });
    const userToDonate = await db.User.findOne({ where: { id: idToDonate } });

    if (user && userToDonate && user.points >= pointsToDonate) {
      user.points = user.points - parseInt(pointsToDonate);
      await user.save();

      userToDonate.points = userToDonate.points + parseInt(pointsToDonate);
      await userToDonate.save();

      console.log("se donó");
      return res.status(200).send("puntos donados correctamente");
    }
    console.log("no se donó algo falló");
    return res.status(200).send("algo salió mal");
  } catch (error: any) {
    console.log(`Error en /users/donatePoints. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

export default router;
