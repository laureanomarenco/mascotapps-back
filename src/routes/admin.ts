import { Router } from "express";
import db from "../../models/index";
import { transactionStatus } from "../types/transactionTypes";
import dotenv from "dotenv";
import { Op } from "sequelize";

dotenv.config();

const router = Router();

router.post("/mutateActiveToActivo", async (req, res) => {
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

router.post("/deleteUser", async (req, res) => {
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

router.get("/createMultiplier", async(req, res) => {
  try {
    const multiplier = await db.Multiplier.findAll()
    if(multiplier.lenght === 0){
      await db.Multiplier.create()
      res.send('multiplicador creado')
    }
    res.send('el multiplicador ya existe')
  } catch (error: any) {
    console.log(`Error en /admin/changeMultiplier. ${error.message}`);
    return res.status(404).send(error.message);
  }
})

router.post("/changeMultiplier", async (req, res) => {
  console.log(`Entré a /admin/changeMultiplier`);
  try {
    const { newMultiplier } = req.body;
    const multiplier = await db.Multiplier.findAll();

    multiplier.number = newMultiplier;
    await multiplier.save();

    res.send('multiplicador cambiado')
  } catch (error: any) {
    console.log(`Error en /admin/changeMultiplier. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

export default router;
