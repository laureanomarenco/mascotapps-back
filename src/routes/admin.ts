import { Router } from "express";
import db from "../../models/index";
import { transactionStatus } from "../types/transactionTypes";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/mutateActiveToActivo", async (req, res) => {
  console.log(`Entré a /admin/mutateActiveToActivo`);
  let password = req.body.password;
  if (password != process.env.ADMIN_PASSWORD) {
    throw new Error(`La password de administrador no es válida`);
  }
  try {
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
