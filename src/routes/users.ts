import { Router } from "express";
import db from "../../models/index";
import { Pet } from "../types/petTypes";
import { SomeUserInfo, UserAttributes } from "../types/userTypes";

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

// get Some User Info:
async function getSomeUserInfo(userId: any) {
  console.log(`Ejecutando función auxiliar someUserInfo`);
  console.log(`userId = ${userId}`);
  try {
    let userInfo = db.User.findByPk(userId);
    if (userInfo) {
      let someUserInfo: SomeUserInfo = {
        name: userInfo.name,
        city: userInfo.city,
        image: userInfo.image,
        contact: userInfo.contact,
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

//! ----- MIDDLEWARE PARA AUTH : ------
const authCheck = (req: any, res: any, next: any) => {
  //ya que tenemos acceso a req.user, podemos chequear si existe(está logueado) o no. Lo mando a "/auth/login" si no está logueado:
  const { id } = req.body;
  if (!id) {
    res.send({ msg: "el usuario no existe" });
  } else {
    next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta get.
  }
};

router.get("/contactinfo/:petid", async (req, res) => {
  console.log(`Entré a la ruta /users/contactinfo/:petid`);
  console.log(`:petid = ${req.params.petid}`);
  try {
    let petID = req.params.petid;
    let petInDB = await db.Animal.findByPk(petID);
    let ownerID = petInDB.UserId;
    let ownerInDB: UserAttributes = await db.User.findByPk(ownerID);
    let contactInfoOfOwner = {
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

// GET(post) ALL PETS OF AUTH USER ID:
// obtener todas las instancias de mascotas que tienen como UserId el id del usuario que quiere obtener el listado de mascotas.
// Esta ruta serviría para que un usuario pueda ver su listado de mascotas posteadas, desde su perfíl.
// Hay que ver el req.user.id de la cookie, y buscar en la tabla Animal (mascotas) todas las instancias que tienen como UserId un valor igual al req.user.id.
// Recolectamos esas instancias en un arreglo y enviamos ese arreglo al cliente.
//---
// /users/getallpetsofuser
router.post("/getallpetsofuser", async (req: any, res) => {
  console.log(`Entré a la ruta /users/getallpetsofuser`);
  console.log("req.body = ");
  console.log(req.body);
  console.log(`user ID = ${req.body?.id}`);
  try {
    let id = req.body?.id;
    let petsPostedByUser: Pet[] = await db.Animal.findAll({
      where: {
        UserId: id,
      },
    });
    return res.status(200).send(petsPostedByUser);
  } catch (error: any) {
    console.log(`error en el /users/getallpetsofusers: ${error.message}`);
    console.log(error);
    return res.status(404).send(error.message);
  }
});

router.delete("/deletepet/:petid", async (req: any, res) => {
  console.log(`En la ruta users/deletepet/:petid.`);
  console.log(`:petid = ${req.body.petid}`);
  console.log(`req.user.id = ${req.body.id}`);
  try {
    let petID = req.body.petid;
    let userID = req.body.id;
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

router.get("/numbervisitors", async (req, res) => {
  console.log("Entré a /numbervisitors");
  try {
    let arrayVisitors = await db.Visitor.findAll();
    let numberOfVisitors = arrayVisitors.length;
    res.status(200).send(`${numberOfVisitors}`);
  } catch (error) {
    res.status(404).send(error);
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
      res.status(409).send("el usuario ya existe");
    } else {
      console.log("se creo");
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
    console.log("buscando si existe el usuario");
    let user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    if (user === null) {
      res.send({ msg: false });
    } else {
      res.send({ msg: true });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.post("/someUserInfo", async (req, res) => {
  console.log(`Entré a la ruta /users/someUserInfo`);
  console.log(`req.body.id = ${req.body?.id}`);
  try {
    if (req.body.id) {
      let userId = req.body.id;
      let someUserInfo: SomeUserInfo = await getSomeUserInfo(userId);
      console.log(`someUserInfo: ${someUserInfo}`);
      return res.status(200).send(someUserInfo);
    } else {
      throw new Error("El user Id enviado no es válido");
    }
  } catch (error: any) {
    console.log(`Error en /users/someUserInfo. Error: ${error.message}`);
    return res.status(400).send(error.message);
  }
});

router.put('/update', as)
export default router;
