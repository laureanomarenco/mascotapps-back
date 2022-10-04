import { Router } from "express";
import dotenv from "dotenv";
import { Op } from "sequelize";
import db from "../../models/index";
import { transactionStatus } from "../types/transactionTypes";
import jwtCheck from "../../config/jwtMiddleware";
import { getAllPets } from "./pets";
import { getAllUsers } from "./users";
import { UserAttributes } from "../types/userTypes";
import { Pet } from "../types/petTypes";
dotenv.config();

const router = Router();

// -------- FUNCIONES AUXILIARES : ---------

// GET ALL REVIEWS TO USER by id
async function getAllReviewsToUser(id: any) {
  try {
    let allReviewsToUser = await db.Review.findAll({
      where: {
        UserId: id,
      },
    });
    console.log(`reviews al User encontradas: ${allReviewsToUser.length}`);
    return allReviewsToUser;
  } catch (error) {
    console.log(`Error en function getAllReviewsToUser en /admin/`);
    throw new Error(`Error al buscar las reviews que el usuario recibió.`);
  }
}

// GET POSTS OF USER by id
async function getPostsOfUser(id: any) {
  console.log(`En getPostsOfUser...`);
  try {
    console.log(`id ingresado como argumento: ${id}`);
    let postsOfUser = await db.Animal.findAll({
      where: {
        UserId: id,
      },
    });
    console.log(
      `Encontrados ${postsOfUser?.length} posts con el id ingresado.`
    );
    return postsOfUser;
  } catch (error: any) {
    console.log(`Error en getPostsOfUser: ${error.message}`);
    throw new Error(`${error.message}`);
  }
}

//---------------------- RUTAS: -----------------------------

router.post("/deleteUser", jwtCheck, async (req, res) => {
  console.log(`Entré a /admin/deleteUser`);
  try {
    let idFromReq: string = req.body.id;
    let emailFromReq: string = req.body.email;
    let passwordFromReq: string = req.body.password;

    if (passwordFromReq != process.env.ADMIN_PASSWORD) {
      return res.status(403).send(`La password de administrador no es válida`);
    }

    let userToBeDeleted = await db.User.findOne({
      where: {
        [Op.and]: [{ id: idFromReq }, { email: emailFromReq }],
      },
    });
    if (!userToBeDeleted) {
      console.log(`Usuario no encontrado con ese email y Id.`);
      throw new Error(
        `Usuario no encontrado con email "${emailFromReq}" y id "${idFromReq}.`
      );
    } else {
      await userToBeDeleted.destroy();
      console.log(`Usuario destruido suavemente.`);
      return res
        .status(200)
        .send(
          `Usuario con email "${emailFromReq}" y id "${idFromReq}" eliminado.`
        );
    }
  } catch (error: any) {
    console.log(`Error en /admin/deleteUser. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

router.post("/cleanPostsOfUserId", jwtCheck, async (req, res) => {
  console.log(`Entré a la ruta /admin/clean`);
  try {
    let passwordFromReq = req.body.password;
    if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
      return res.status(403).send(`La password de administrador no es válida`);
    }
    if (!req.body.userId) {
      throw new Error(
        `Debe ingresar un userId. Usted envió "${req.body.userId}"`
      );
    }
    console.log(`req.body.userId = ${req.body.userId}`);
    let userId = req.body.userId;

    let postsOfUser = await getPostsOfUser(userId);
    if (!postsOfUser) {
      throw new Error(`No se encontraron posts del user con id ${userId}`);
    }
    console.log(`Número de posts encontrados: ${postsOfUser?.length}`);
    console.log("Iniciando soft destruction de posteos...");
    let numberOfPostsDestroyed = 0;
    for (const post of postsOfUser) {
      await post.destroy();
      console.log("post destruido");
      numberOfPostsDestroyed++;
    }
    return res
      .status(200)
      .send(`Número de posts destruidos: ${numberOfPostsDestroyed}`);
  } catch (error: any) {
    console.log(`Error en la ruta /admin/cleanPostsOfUserId. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

router.post("/cleanReviewsToUser", jwtCheck, async (req, res) => {
  console.log(`En ruta /admin/cleanReviewsToUser`);
  try {
    let passwordFromReq = req.body.password;
    if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
      return res.status(403).send(`La password de administrador no es válida`);
    }
    let userId = req.body.userId;
    console.log(`userId recibido = ${userId}`);
    let allReviewsToUser = await getAllReviewsToUser(userId);
    if (!allReviewsToUser) {
      throw new Error(`Las reviews al usuario encontradas es falso.`);
    }
    if (Array.isArray(allReviewsToUser) && allReviewsToUser.length === 0) {
      return res.status(200).send("No parecen haber reviews con ese UserId");
    }
    let reviewsErased = 0;
    console.log(
      `Empezando a borrar reviews... Reviews por borrar: ${allReviewsToUser.length}`
    );

    for (const review of allReviewsToUser) {
      await review.destroy();
      console.log("Review borrada...");
      reviewsErased++;
    }
    console.log("Cantidad de reviews borradas: " + reviewsErased);
    return res
      .status(200)
      .send(`Cantidad de reviews soft destroyed: ${reviewsErased}`);
  } catch (error: any) {
    console.log(`Error en /cleanReviewsToUser. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

// DELETE PETS WITH NO UserId
router.post("/deletePetsWithNoUserId", jwtCheck, async (req, res) => {
  console.log(`En ruta /admin/deletePetsWithNoUserId`);
  try {
    // CHEQUEAR SI EL REQ.AUTH.SUB EXISTE EN LA DB
    let passwordFromReq = req.body.password;
    if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
      return res.status(403).send(`La password de administrador no es válida`);
    }
    let allThePetsWithNoUser = await db.Animal.findAll({
      where: {
        UserId: {
          [Op.eq]: null,
        },
      },
    });
    console.log(
      `Cantidad de pets encontradas: ${allThePetsWithNoUser?.length}`
    );
    console.log(`Empezando a borrar mascotas con UserId === null`);
    let petsDestroyed = 0;
    for (const pet of allThePetsWithNoUser) {
      await pet.destroy();
      console.log(`Animal soft destroyed...`);
      petsDestroyed++;
    }
    return res
      .status(200)
      .send(`Cantidad de Mascotas/Posts eliminados: ${petsDestroyed}.`);
  } catch (error: any) {
    console.log(`Error en /admin/deletePetsWithNoUserId. ${error.message}`);
  }
});

router.post("/deletePet", jwtCheck, async (req, res) => {
  console.log(`En ruta /admin/deletePet`);
  try {
    let passwordFromReq = req.body.password;
    if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
      return res.status(403).send(`La password de administrador no es válida`);
    }
    const { petId } = req.body;
    const pet = await db.Animal.findOne({ where: { id: petId } });
    if (pet) {
      await pet.destroy();
      return res.status(200).send("la publicación fue eliminada");
    }
    return res.status(200).send("la publicación no existe");
  } catch (error: any) {
    console.log(`Error en /admin/deletePets ${error.message}`);
  }
});

//BORRAR PETS QUE TIENEN UN UserId de un User que no existe en la DB
router.delete("/purgePetsWithFalseUser", async (req, res) => {
  console.log(`Entré a admin/purgePetsWithFalseUser`);
  try {
    const password = req.body.password;
    if (!password) {
      throw new Error(`La password enviada por body es "${password}"`);
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).send(`Password inválida.`);
    }
    let allThePets = await getAllPets();
    let allTheUsers: UserAttributes[] = await getAllUsers();
    let userIds = allTheUsers.map((user) => user.id);
    console.log(`userIds = `);
    console.log(userIds);
    let numberOfPetsPurged = 0;
    for (let i = 0; i < allThePets.length; i++) {
      if (!userIds.includes(allThePets[i].UserId)) {
        console.log(`Destruyendo Pet con id ${allThePets[i].id}`);
        await allThePets[i].destroy();
        numberOfPetsPurged++;
      }
    }
    console.log(`Cantidad de mascotas purgadas: ${numberOfPetsPurged}`);
    return res
      .status(200)
      .send(`Cantidad de mascotas destruidas: ${numberOfPetsPurged}`);
  } catch (error: any) {
    console.log(`Error en admin/purgePetsWithFalseUser. ${error.message}`);
    return res.status(400).send(error.message);
  }
});

// ----   RUTAS MULTIPLICADORAS:  -----------
router.get("/createMultiplier", jwtCheck, async (req, res) => {
  try {
    const multiplier = await db.Multiplier.findAll();
    if (multiplier.length === 0) {
      await db.Multiplier.create({ number: 1 });
      res.send("multiplicador creado");
    }
    res.send("el multiplicador ya existe");
  } catch (error: any) {
    console.log(`Error en /admin/changeMultiplier. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

router.post("/changeMultiplier", jwtCheck, async (req, res) => {
  console.log(`Entré a /admin/changeMultiplier`);
  try {
    // Agregar chequeo de si existe el req.auth.sub en la DB
    let passwordFromReq = req.body.password;
    if (passwordFromReq !== process.env.ADMIN_PASSWORD) {
      return res.status(403).send(`La password de administrador no es válida`);
    }
    const { newMultiplier } = req.body;
    const multiplier = await db.Multiplier.findByPk(1);
    let newMultiplierToNumber: number = Number(newMultiplier);
    multiplier.number = newMultiplierToNumber;
    await multiplier.save();

    res.send(`multiplicador cambiado. Valor actual = ${multiplier.number}`);
  } catch (error: any) {
    console.log(`Error en /admin/changeMultiplier. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

// ------ RUTAS DEPRECADAS O YA SIN SENTIDO : ------

router.post("/mutateActiveToActivo", jwtCheck, async (req, res) => {
  console.log(`Entré a /admin/mutateActiveToActivo`);
  let password = req.body.password;

  try {
    if (password != process.env.ADMIN_PASSWORD) {
      return res.status(403).send(`La password de administrador no es válida`);
    }
    let allActiveTransactions = await db.Transaction.findAll({
      where: {
        status: "active",
      },
    });
    let numberModified = 0;
    for (const trans of allActiveTransactions) {
      trans.status = transactionStatus.Active;
      await trans.save();
      numberModified++;
      console.log(
        `Transacciones modificadas de "active" a ${transactionStatus.Active}: ${numberModified}`
      );
    }
    return res.status(200).send({ transactionsModified: `${numberModified}` });
  } catch (error: any) {
    console.log(`Error en el /admin/mutateActiveToActivo`);
    return res.status(404).send(error.message);
  }
});

export default router;
