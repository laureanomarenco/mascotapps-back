"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const express_1 = require("express");
const index_1 = __importDefault(require("../../models/index"));
const sequelize_1 = require("sequelize");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const UserValidators_1 = require("../auxiliary/UserValidators");
const { GMAIL_PASS, GMAIL_USER } = process.env;
const router = (0, express_1.Router)();
const multiplierPoints = 1;
// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------
//!------------
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield index_1.default.User.findAll();
        // console.log(allUsers);
        return allUsers;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
exports.getAllUsers = getAllUsers;
const getAllReviewsRecived = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allReviews = yield index_1.default.Review.findAll({
            where: {
                UserId: userId,
            },
        });
        return allReviews;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
const getAllTransactions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTransactions = yield index_1.default.Transaction.findAll({
            where: {
                [sequelize_1.Op.or]: [{ user_offering_id: userId }, { user_demanding_id: userId }],
            },
        });
        return allTransactions;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
});
// get Some User Info:
function getSomeUserInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Ejecutando función auxiliar someUserInfo`);
        console.log(`userId = ${userId}`);
        try {
            let userInfo = yield index_1.default.User.findByPk(userId);
            if (userInfo) {
                let someUserInfo = {
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
                    linkToDonate: userInfo.linkToDonate,
                    endpoints: userInfo.endpoints,
                    isBanned: userInfo.isBanned,
                    isAdmin: userInfo.isAdmin,
                };
                console.log(`retornando someUserInfo: ${someUserInfo}`);
                return someUserInfo;
            }
            else {
                throw new Error(`usuario no encontrado`);
            }
        }
        catch (error) {
            console.log(`Error en la función auxiliar someUserInfo: ${error.message}`);
            return error.message;
        }
    });
}
//Parse Pets Posted By User ---> deja afuera el UserId
function parsePetsPostedByUser(petsPostedByUser) {
    console.log(`En function auxiliary parsePetsPostedByUser`);
    try {
        let parsedPets = petsPostedByUser.map((pet) => {
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
        console.log(`Retornando parsedPets. parsedPets.length = ${parsedPets.length}`);
        return parsedPets;
    }
    catch (error) {
        return error;
    }
}
//GET POSTS OF USER:
function getPostsOfUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Buscando los posteos de user con id: ${id}`);
        try {
            let postsOfUser = yield index_1.default.Animal.findAll({
                where: {
                    UserId: id,
                },
            });
            console.log(`${postsOfUser === null || postsOfUser === void 0 ? void 0 : postsOfUser.length} posts encontrados`);
            return postsOfUser;
        }
        catch (error) {
            return error.message;
        }
    });
}
function getParsedReviewsToOwner(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let reviewsToUser = yield index_1.default.Review.findAll({
                where: {
                    UserId: id,
                },
            });
            let parsedReviewsWithMoreData = yield parseReviewsToOwner(reviewsToUser);
            return parsedReviewsWithMoreData;
        }
        catch (error) {
            console.log(`Error en function getReviewsToOwner`);
            return error.message;
        }
    });
}
function parseReviewerName(reviewerName) {
    console.log(`Parseando reviewer name`);
    try {
        if (!reviewerName) {
            return "Anónimo";
        }
        else {
            return reviewerName;
        }
    }
    catch (error) {
        console.log(`Error en el parseReviewerName. ${error.message}`);
        return error.message;
    }
}
function parseReviewerImage(reviewerImage) {
    try {
        if (!reviewerImage) {
            return "https://www.utas.edu.au/__data/assets/image/0013/210811/varieties/profile_image.png";
        }
        else {
            return reviewerImage;
        }
    }
    catch (error) {
        console.log(`Error en la function parseReviewerImage. ${error.message}`);
        return error.message;
    }
}
function parseReviewsToOwner(arrayOfReviews) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Parseando las reviews...`);
        // console.log(arrayOfReviews);
        try {
            let parsedReviews = yield Promise.all(arrayOfReviews.map((review) => __awaiter(this, void 0, void 0, function* () {
                // console.log("review:");
                // console.log(review);
                let reviewer = yield index_1.default.User.findByPk(review.reviewer_id);
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
                    reviewer_name: parseReviewerName(reviewer === null || reviewer === void 0 ? void 0 : reviewer.name),
                    reviewer_image: parseReviewerImage(reviewer === null || reviewer === void 0 ? void 0 : reviewer.image),
                };
            })));
            console.log(`Devolviendo las parsedReviews:`);
            // console.log(parsedReviews);
            return parsedReviews;
        }
        catch (error) {
            console.log(`Error en el parseReviewsToOwner. ${error.message}`);
            return error.message;
        }
    });
}
// EMAIL EXISTS IN DATABASE:
function emailExistsInDB(emailFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Chequeando si el email "${emailFromReq} existe en la DB`);
        try {
            let userWithEmail = yield index_1.default.User.findOne({
                where: {
                    email: emailFromReq,
                },
            });
            if (userWithEmail) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(`Error en function emailExistsInDB`);
            return error.message;
        }
    });
}
//! ----- MIDDLEWARE PARA AUTH : ------
const authCheck = (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.send({ msg: "el usuario no existe" });
    }
    else {
        next(); //continuá al siguiente middleware, que sería el (req, res) => {} de la ruta
    }
};
// ----- ------ ------- RUTAS :  ------ ------- -------
//GET ALL USERS FROM DB:  //! Hay que dejarla comentada ( o borrarla) porque no es seguro poder tener toda la data de los users registrados:
router.get("/", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al get de Users!");
    try {
        let allTheUsers = yield (0, exports.getAllUsers)();
        // console.log(allTheUsers);
        return res.status(200).send(allTheUsers);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
// GET NUMBER OF USERS IN DB:
router.get("/numberOfUsersInDB", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entré a la route /numberOfUsersInDB");
    try {
        let allUsersInDB = yield (0, exports.getAllUsers)();
        let numberOfUsersInDB = allUsersInDB.length;
        let numberOfUsersInDBtoString = `${numberOfUsersInDB}`;
        return res.status(200).send(numberOfUsersInDBtoString);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}));
// GET CONTACT INFO / PET ID
router.get("/contactinfo/:petid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /users/contactinfo/:petid`);
    console.log(`:petid = ${req.params.petid}`);
    try {
        let petID = req.params.petid;
        let petInDB = yield index_1.default.Animal.findByPk(petID);
        let ownerID = petInDB === null || petInDB === void 0 ? void 0 : petInDB.UserId;
        let ownerInDB = yield index_1.default.User.findByPk(ownerID);
        if (!ownerInDB) {
            throw new Error(`Usuario dueño de la mascota no fue encontrado en la Data Base.`);
        }
        let reviewsToOwner = yield getParsedReviewsToOwner(ownerID);
        let contactInfoOfOwner = {
            //displayName: ownerInDB.displayName,
            name: ownerInDB.name,
            email: ownerInDB.email,
            city: ownerInDB.city,
            image: ownerInDB.image,
            contact: ownerInDB.contact,
            isDonator: ownerInDB.isDonator,
            linkToDonate: ownerInDB.linkToDonate,
            reviews: [...reviewsToOwner],
        };
        console.log(`contactInfoOfOwner = ${contactInfoOfOwner}`);
        return res.status(200).send(contactInfoOfOwner);
    }
    catch (error) {
        console.log(`error en /contactinfo/:petid = ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
// GET(post) ALL PETS OF USER ID:
router.get("/getallpetsofuser", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`Entré a la ruta "/users/getallpetsofuser".`);
    // console.log(req.body);
    try {
        let userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        console.log(`user ID por auth.sub = ${userId}`);
        if (!userId) {
            console.log(`Error en /users/getallpetsofuser. El req.body.id es falso/undefined`);
            throw new Error(`Error en /users/getallpetsofuser. El req.oidc.sub es falso/undefined`);
        }
        // let id = req.body.id;
        let petsPostedByUser = yield index_1.default.Animal.findAll({
            where: {
                UserId: userId,
            },
        });
        if ((petsPostedByUser === null || petsPostedByUser === void 0 ? void 0 : petsPostedByUser.length) > 0) {
            let parsedPetsPostedByUser = parsePetsPostedByUser(petsPostedByUser);
            return res.status(200).send(parsedPetsPostedByUser);
        }
        else {
            console.log(`Retornando petsPostedByUser con .length <= 0. Su length es ${petsPostedByUser === null || petsPostedByUser === void 0 ? void 0 : petsPostedByUser.length}`);
            return res.status(200).send(petsPostedByUser);
        }
    }
    catch (error) {
        console.log(`error en el /users/getallpetsofusers: ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.delete("/deletePet", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    console.log(`En la ruta users/deletePet.`);
    console.log(`petId = ${(_b = req.query) === null || _b === void 0 ? void 0 : _b.petId}`);
    // console.log(req.body);
    console.log(`req.auth.sub = ${(_c = req.auth) === null || _c === void 0 ? void 0 : _c.sub}`);
    try {
        let petId = req.query.petId;
        let userId = (_d = req.auth) === null || _d === void 0 ? void 0 : _d.sub;
        if (!petId || !userId) {
            throw new Error(`El petId y/o userId son falsos.`);
        }
        //buscar instancia de mascota en DB:
        let petToDeleteInDB = yield index_1.default.Animal.findByPk(petId);
        if (petToDeleteInDB.UserId == userId) {
            //borrar instancia de la DB:
            yield index_1.default.Transaction.destroy({ where: { pet_id: petId } });
            yield petToDeleteInDB.destroy();
            console.log(`pet with id ${petId} ...  soft-destroyed`);
            return res.status(200).send({ msg: "Mascota borrada" });
        }
        else {
            //retornar que no coincide el petToDelete.UserId con el req.auth.sub
            return res
                .status(400)
                .send(`El ID del cliente no coincide con el UserId de la mascota.`);
        }
    }
    catch (error) {
        console.log(`Hubo un error en el users/deletepet = ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/newuser", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    console.log(`Entré en /user/newUser`);
    try {
        const id = (_e = req.auth) === null || _e === void 0 ? void 0 : _e.sub;
        if (!id) {
            throw new Error(`El id por token "${id}" es falso`);
        }
        const { email, name, city, contact, image, linkToDonate } = req.body;
        const isBanned = yield index_1.default.Ban.findOne({ where: { email: email } });
        if (isBanned) {
            throw new Error(`El email ${email} esta registrado como baneado.`);
        }
        let emailExisteEnLaDB = yield emailExistsInDB(email);
        if (emailExisteEnLaDB) {
            throw new Error(`El email ${email} ya está registrado. Por favor, use otro email para el registro.`);
        }
        const newUserFromReq = {
            id: req.auth.id,
            email: email,
            name: name,
            contact: contact,
            city: city,
            image: image,
            linkToDonate: linkToDonate,
        };
        const validatedNewUser = (0, UserValidators_1.validateNewUser)(newUserFromReq);
        console.log(`New User: ${validatedNewUser}`);
        let newUserCreated = yield index_1.default.User.create(validatedNewUser);
        if (newUserCreated) {
            console.log(`Nuevo usuario creado con email ${newUserCreated.email}:`);
            return res.status(200).send(newUserCreated);
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
}));
router.get("/exists", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    console.log(`Entré al GET users/exists`);
    try {
        const id = (_f = req.auth) === null || _f === void 0 ? void 0 : _f.sub;
        console.log(`Buscando si existe el usuario con id ${id}`);
        let user = yield index_1.default.User.findByPk(id);
        //chequeo si está baneado:
        let userBanned = yield index_1.default.Ban.findByPk(id);
        if (userBanned) {
            console.log(`El usuario con id ${id} se encuentra baneado`);
            return res.status(200).send({ msg: "banned" });
        }
        if (!user) {
            console.log(`Usuario con id: ${id} no encontrado`);
            return res.send({ msg: false });
        }
        else {
            console.log(`Usuario con id: ${id} encontrado.`);
            return res.send({ msg: true });
        }
    }
    catch (error) {
        console.log(`Error en users/exists. ${error.message}`);
        return res.status(404).send(error);
    }
}));
router.put("/update", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    console.log(`Entré a users/update`);
    console.log(`Me llegó por body: `);
    console.log(req.body);
    try {
        const id = (_g = req.auth) === null || _g === void 0 ? void 0 : _g.sub;
        if (!id) {
            throw new Error(`El id del token "${id}" no es válido.`);
        }
        // const { image, contact, city, email, name, linkToDonate } = req.body;
        let updatedNewProfileFromReq = Object.assign({ id: id }, req.body);
        let validatedNewProfile = (0, UserValidators_1.validateNewUser)(updatedNewProfileFromReq);
        const newProfile = yield index_1.default.User.update(validatedNewProfile, {
            where: {
                id: id,
            },
        });
        console.log(`Perfil de usuario actualizado: `);
        console.log(newProfile);
        return res.status(200).send(newProfile);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.get("/getMultipleUserInfo", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    console.log(`Entré a la ruta /users/getMultipleUserInfo`);
    console.log(`req.auth.sub = ${(_h = req.auth) === null || _h === void 0 ? void 0 : _h.sub}`);
    try {
        if ((_j = req.auth) === null || _j === void 0 ? void 0 : _j.sub) {
            let userId = req.auth.sub;
            let someUserInfo = yield getSomeUserInfo(userId); //obj con props
            let userReviewsRecived = yield getAllReviewsRecived(userId); //arreglo de objs
            let userTransactions = yield getAllTransactions(userId); //arreglo de objs
            let postsOfUser = yield getPostsOfUser(userId); //arreglo de objs
            console.log(`Devolviendo multipleUserInfo...`);
            //! TODO ESTO PODRÏA ESTAR ADENTRO DE UN Promise.all() ?? Sería mejor?
            const multipleUserInfo = {
                userProps: Object.assign({}, someUserInfo),
                reviews: [...userReviewsRecived],
                transactions: [...userTransactions],
                posts: [...postsOfUser],
            };
            return res.status(200).send(multipleUserInfo);
        }
        else {
            throw new Error(`El id '${req.auth.sub}' es falso.`);
        }
    }
    catch (error) {
        console.log(`Error en /users/getMultipleUserInfo. ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
router.get("/ranking", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Estoy en /users/ranking.`);
    try {
        let allTheUsers = yield (0, exports.getAllUsers)();
        const ranking = allTheUsers.sort(function (a, b) {
            return b.points - a.points;
        });
        const topTen = ranking.slice(0, 9);
        res.status(200).send(topTen);
    }
    catch (error) {
        console.log(`Error en /users/ranking. ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
router.get("/points", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    console.log(`Estoy en /users/points.`);
    try {
        const id = (_k = req.auth) === null || _k === void 0 ? void 0 : _k.sub;
        const user = yield index_1.default.User.findOne({ where: { id: id } });
        if (user) {
            return res.status(200).send({ points: user.points });
        }
        console.log(`No se encontró al usuario por id`);
        return res.status(200).send("no existe el usuario");
    }
    catch (error) {
        console.log(`Error en /users/points ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
router.get("/rankingGaveAdoption", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Estoy en /users/rankingGaveAdoption.`);
    try {
        let allTheUsers = yield (0, exports.getAllUsers)();
        const ranking = allTheUsers.sort(function (a, b) {
            return b.gaveUpForAdoption - a.gaveUpForAdoption;
        });
        const topTen = ranking.slice(0, 9);
        res.status(200).send(topTen);
    }
    catch (error) {
        console.log(`Error en /users/rankingGaveAdoption. ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
router.post("/buyProducts", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    console.log(`Estoy en /users/buyProducts.`);
    try {
        const { name, items, totalPoints, mail, direccion } = req.body;
        let userID = (_l = req.auth) === null || _l === void 0 ? void 0 : _l.sub;
        const user = yield index_1.default.User.findOne({ where: { id: userID } });
        if (user) {
            console.log(user, totalPoints, items);
            user.points = user.points - totalPoints;
            yield user.save();
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
                html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
          <style>
              p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
              h1{ font-size: 30px !important;}
              h2{ font-size: 25px !important;}
              h3{ font-size: 18px !important;}
              h4{ font-size: 16px !important;}
              p, a{font-size: 15px !important;}
              .imag{
                  width: 20px;
                  height: 20px;
              }
              .contA{
                  margin: 0px 5px 0 5px;
              }
          </style>
      </head>
      <body>
          <div style="width: 100%; background-color: #e3e3e3;">
              <div style="padding: 20px 10px 20px 10px;">
      
                  <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                      <h1>Registramos tu compra🙌🙌🙌</h1>
                      <p>Hola ${name} estamos preparando tu compra para enviarla a ${direccion}. Te daremos aviso cuando el producto esté en camino.</p>
      
                      <div>Productos: ${items.map((i) => {
                    return i.title;
                })}</div>
                        <div>Puntos: ${totalPoints}</div>
                      <!-- Gracias -->
                      <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>El equipo de Mascotapp❤️❤️❤️</p>
                  </div>
                  <!-- Contenido principal -->
      
                  <!-- Footer -->
                  <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                      <!-- Redes sociales -->
                      <a href="https://github.com/laureanomarenco/mascotapps-front" class="contA">GitHub</a>
                      <a href="https://mascotapps.vercel.app/" class="contA">Mascotapp</a>
                  </div>
              </div>
          </div>
      </body>
      </html>`,
                // `<div>${msgMail}</div><div>Productos: ${items.map((i: any) => {
                //   return i.title;
                // })}</div><div>Puntos: ${totalPoints}</div><div>Muchas gracias de parte del equipo de mascotapp.</div>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error)
                    console.log(error);
                else
                    console.log("Email enviado: " + info.response);
            });
            return res.status(200).send("compra realizada exitosamente");
        }
        console.log(`El usuario con id "${userID} no existe"`);
        return res.status(404).send("el usuario no existe");
    }
    catch (error) {
        console.log(`Error en /users/buyProducts. ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
// DONATE POINTS:
router.post("/donatePoints", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    console.log(`Estoy en /users/donatePoints.`);
    try {
        const id = (_m = req.auth) === null || _m === void 0 ? void 0 : _m.sub;
        if (!id) {
            throw new Error(`El req.auth.sub es falso`);
        }
        const { idToDonate, pointsToDonate } = req.body;
        const user = yield index_1.default.User.findOne({ where: { id: id } });
        const userToDonate = yield index_1.default.User.findOne({ where: { id: idToDonate } });
        if (user && userToDonate && user.points >= pointsToDonate) {
            user.points = user.points - parseInt(pointsToDonate);
            yield user.save();
            userToDonate.points = userToDonate.points + parseInt(pointsToDonate);
            yield userToDonate.save();
            console.log(`Se donaron ${pointsToDonate} mascopoints al usuario con name "${userToDonate.name}"`);
            return res.status(200).send({
                msg: `¡Has donado ${pointsToDonate} mascopoints a ${userToDonate.name}! Gracias por usar Mascotapp 🐶`,
            });
        }
        console.log("No se donó. Algo falló en el if anterior.");
        return res.status(409).send({
            msg: "Lo siento. Algo salió mal. Es posible que el usuario al que quiere donarle ya no exista más.",
        });
    }
    catch (error) {
        console.log(`Error en /users/donatePoints. ${error.message}`);
        return res.status(400).send({ msg: "Lo siento. Hubo un error." });
    }
}));
exports.default = router;
