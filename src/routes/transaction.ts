import { Router } from "express";
import { Op } from "sequelize";
import db from "../../models/index";
import { validateNewTransaction } from "../auxiliary/TransactionValidators";
import { ITransaction } from "../types/transactionTypes";
const { GMAIL_PASS, GMAIL_USER } = process.env;

const router = Router();

//-----  FUNCIONES AUXILIARES: -------------------------------
async function getAllTransactions() {
  try {
    let allTheTransactionsFromDB = await db.Transaction.findAll();
    return allTheTransactionsFromDB;
  } catch (error: any) {
    console.log(
      `Error en function getAllTransactions. Error message: ${error.message} `
    );
    throw new Error(error.message);
  }
}

async function mailer(userOffering: any, userDemanding: any, offeringPet: any) {
  const nodemailer = require("nodemailer");
  console.log(GMAIL_PASS, GMAIL_USER);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });
  //Mail para el demanding
  let demandingMail = userDemanding.email;
  let offeringMail = userOffering.email;

  console.log(userDemanding.email, userOffering.email);
  const msgMailDemanding = `Registramos que ${userOffering.name} quiere contactarte por ${offeringPet.name}. Te deseamos suerte en tu busqueda y te facilitamos los siguientes datos para contactarte con ${userOffering.name}. Un saludo de parte del equipo de Mascotapp`;

  const mailOptionsDemanding = {
    from: "service.mascotapp@gmail.com",
    to: demandingMail,
    subject: "Alguien está interesado en una mascota tuya",
    html: `<div>${msgMailDemanding}</div><div>${userOffering.email}</div><div>${userOffering.contact}</div>`,
  };

  transporter.sendMail(mailOptionsDemanding, function (error: any, info: any) {
    if (error) console.log(error);
    else console.log("Email enviado: " + info.response);
  });
  //Mail para el offering

  const msgMailOffering = `Registramos que qures contactarte con ${userDemanding.name} por ${offeringPet.name}. Te deseamos suerte en tu interacción y te facilitamos los siguientes datos para contactarte con ${userDemanding.name}. Un saludo de parte del equipo de Mascotapp.`;

  const mailOptionsOffering = {
    from: "service.mascotapp@gmail.com",
    to: offeringMail,
    subject: "Mucha suerte en tu busqueda",
    html: `<div>${msgMailOffering}</div><div>${userDemanding.email}</div><div>${userDemanding.contact}</div>`,
  };

  transporter.sendMail(mailOptionsOffering, function (error: any, info: any) {
    if (error) console.log(error);
    else console.log("Email enviado: " + info.response);
  });
}
//------  RUTAS: -----------------------------------------------
router.get("/allTransactions", async (req, res) => {
  console.log(`Entré a la ruta /transactions/allTransactions`);
  try {
    let allTransactions = await getAllTransactions();
    return res.status(200).send(allTransactions);
  } catch (error: any) {
    console.log(`Error en /transactions/allTransactions`);
    return res.status(404).send(error.message);
  }
});

router.get("/transactionsCompleted", async (req, res) => {
  console.log(`Entré a la ruta /transactions/transactionsCompleted`);
  try {
    const transactionsCompleted = await db.Transaction.findAll({
      where: { status: "finalizado" },
    });
    return res.status(200).send(transactionsCompleted);
  } catch (error: any) {
    console.log(`Error en /transactions/transactionsCompleted`);
    return res.status(404).send(error.message);
  }
});

router.post("/transactionSuccess", async(req, res) => {
  console.log(`Entré a la ruta /transactions/transactionSuccess`);
  try {
    const { id } = req.body;
    const { petId } = req.query;

    const pet = await db.Animal.findOne({ where: { id: petId }});
    if(pet.UserId === id){
      if(pet.status === 'en adopción'){
        pet.withNewOwner = 'true';
        pet.wasTransacted = 'true';
        pet.save();
        console.log('se acutalizo el esta withNewOner y wasTransacted de la mascota')
      } else {
        pet.backWithItsOwner = 'true';
        pet.wasTransacted = 'true';
        pet.save();
        console.log('se acutalizo el esta backWithItsOwner y wasTransacted de la mascota')
      }
      res.send({msg: 'estados actualizados'})
    }

    throw new Error ('No puedes modificar el estado de esta mascota porque no eres quién la publicó.')
  } catch (error: any) {
    console.log(`Error en /transactions/transactionsCompleted`);
    return res.status(404).send(error.message);
  }
})

router.post("/cancelTransaction", async (req, res) => {
  console.log(`Entré a la ruta /transactions/cancelTransaction`);
  try {
    const { id } = req.body;
    const { petId } = req.query;

    const pet = await db.Animal.findOne({ where: { id: petId }});
    if(pet.UserId === id){
      pet.wasTransacted = 'canceled';
      pet.save();
      console.log('se acutalizowasTransacted a canceled')
    }
    throw new Error ('No puedes modificar el estado de esta mascota porque no eres quién la publicó.')
  } catch (error: any) {
    console.log(`Error en /Transactions/cancelTransaction. ${error.message}`);
    return res.status(404).send(error.message);
  }
})

router.post("/getUserTransactions", async (req, res) => {
  console.log(`Entré a la ruta /Transactions/getUserTransactions`);
  try {
    const { id } = req.body;

    const userTransactions = await db.Transaction.findAll({
      where: {
        [Op.or]: [{ user_offering_id: id }, { user_demanding_id: id }],
      },
    });

    return res.status(200).send(userTransactions);
  } catch (error: any) {
    console.log(`Error en /Transactions/allTransactions. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

router.post("/newTransaction", async (req, res) => {
  console.log(`Entré a la ruta /Transactions/newTransaction`);
  try {
    const { id } = req.body;
    const { petId } = req.query;
    if (!id || !petId) {
      console.log(`req.body.id  o  req.query.petId  es falso/undefined.`);
      throw new Error(`req.body.id  o  req.query.petId  es falso/undefined.`);
    }
    const prevTransaction = await db.Transaction.findOne({ where: {[Op.and]: [{ pet_id: petId }, { user_demanding_id: id }]}})

    if(prevTransaction) {
      console.log(`esta transacción ya existe por lo que no se creará`);
     res.send({msg: 'transacción ya existente'})
    }
    const userDemanding = await db.User.findOne({ where: { id: id } });
    const offeringPet = await db.Animal.findOne({ where: { id: petId } });
    const userOffering = await db.User.findOne({
      where: { id: offeringPet.UserId },
    });
    if (!userDemanding || !offeringPet || !userOffering) {
      console.log(
        `Error al buscar por ID alguna de las instancias de userDemanding, offeringPet o userOffering. Tirando error...`
      );
      throw new Error(
        `userDemanding || offeringPet || userOffering  no se encontró en la DB.`
      );
    }
    if (userDemanding.id === userOffering.id) {
      console.log(
        `ID de usuario ofertante y demandante son iguales!!!! Error!`
      );
      throw new Error(
        `El id del userDemanding y el userOffering son iguales. No es posible crear una transacción entre el mismo usuario.`
      );
    }
    if (offeringPet.wasTransacted !== "false") {
      console.log(`offeringPet.wasTransacted === "true" ! Error!`);
      throw new Error(
        `Esta mascota no está disponible ya que ya es parte de una transacción. Lo sentimos mucho :( )`
      );
    }

    const newTransaction: ITransaction = {
      user_offering_id: userOffering.id,
      user_offering_name: userOffering.name,
      user_demanding_id: userDemanding.id,
      user_demanding_name: userDemanding.name,
      status: "active",
      pet_id: offeringPet.id,
      pet_name: offeringPet.name,
      pet_image: offeringPet.image,
      user_offering_check: undefined,
      user_demanding_check: undefined,
    };
    let validatedTransactionObj: ITransaction =
      validateNewTransaction(newTransaction);
    let createdTransaction = await db.Transaction.create(
      validatedTransactionObj
    );
    console.log(
      `Nueva transacción creada.`
    );

    //mailer
    await mailer(userDemanding, userOffering, offeringPet);

    return res
      .status(200)
      .send({ msg: "nueva transacción creada", createdTransaction });
  } catch (error: any) {
    console.log(`Error en /Transactions/allTransactions. ${error.message}`);
    return res.status(404).send(error.message);
  }
});

router.put("/transactionCheck", async (req, res) => {
  console.log("en la ruta /Transactions/transactionCheck");
  try {
    const { transactionId } = req.query;
    const { id } = req.body;

    const transaction = await db.Transaction.findOne({
      where: { id: transactionId },
    });

    if (id === transaction.user_offering_id) {
      transaction.user_offering_check = "finalizado";
      await transaction.save();
      if (transaction.user_demanding_check !== null) {
        transaction.status = "finalizado";
        await transaction.save();
        console.log(`Transaction.status ahora es "finalizado".`);
      }
    }
    if (id === transaction.user_demanding_id) {
      transaction.user_demanding_check = "finalizado";
      await transaction.save();
      if (transaction.user_offering_check !== null) {
        transaction.status = "finalizado";
        await transaction.save();
        console.log(`Transaction.status ahora es "finalizado".`);
      }
    }

    res.status(200).send({ msg: "status checked" });
  } catch (error: any) {
    console.log(`Error en /Transactions/allTransactions`);
    return res.status(404).send(error.message);
  }
});

export default router;
