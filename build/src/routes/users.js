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
const express_1 = require("express");
const index_1 = __importDefault(require("../../models/index"));
const sequelize_1 = require("sequelize");
const { GMAIL_PASS, GMAIL_USER } = process.env;
const router = (0, express_1.Router)();
const multiplierPoints = 1;
// ----- ------ ------ FUNCIONES AUXILIARES PARA LAS RUTAS: ------- -------- --------
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
                    linkToDonate: userInfo.linkToDonate
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entré al get de Users!");
    try {
        let allTheUsers = yield getAllUsers();
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
        let allUsersInDB = yield getAllUsers();
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
router.post("/getallpetsofuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`Entré a la ruta "/users/getallpetsofuser". El req.body es =`);
    // console.log(req.body);
    try {
        console.log(`user ID = ${(_a = req.body) === null || _a === void 0 ? void 0 : _a.userId}`);
        let userId = req.body.userId;
        // console.log(`req.oidc.user.sub = ${req.oidc.user.sub}`);
        // console.log(`req.oidc.user =`);
        // console.log(req.oidc.user);
        // let idFromOIDC = req?.oidc?.user.sub;
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
        console.log(error);
        return res.status(404).send(error.message);
    }
}));
router.post("/deletePet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    console.log(`En la ruta users/deletePet.`);
    console.log(`petId = ${(_b = req.body) === null || _b === void 0 ? void 0 : _b.petId}`);
    console.log(req.body);
    console.log(`req.body.id = ${(_c = req.body) === null || _c === void 0 ? void 0 : _c.id}`);
    try {
        let petId = req.body.petId;
        let userId = req.body.id;
        //buscar instancia de mascota en DB:
        let petToDeleteInDB = yield index_1.default.Animal.findByPk(petId);
        if (petToDeleteInDB.UserId == userId) {
            //borrar instancia de la DB:
            // await petToDeleteInDB.destroy();
            let deletedPet = yield petToDeleteInDB.destroy();
            console.log(`pet with id ${req.body.id} ...  soft-destroyed`);
            return res.status(200).send({ msg: "Mascota borrada" });
        }
        else {
            //retornar que no coincide el petToDelete.UserId con el req.user.id
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
router.post("/newuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré en /user/newUser`);
    const { email, name, city, contact, image, id, linkToDonate } = req.body;
    try {
        let emailExisteEnLaDB = yield emailExistsInDB(email);
        if (emailExisteEnLaDB) {
            throw new Error(`El email ${email} ya está registrado. Por favor, use otro email para el registro.`);
        }
        console.log("new user..", name);
        let [newUser, created] = yield index_1.default.User.findOrCreate({
            where: {
                name,
                email,
                id,
                city,
                contact,
                image,
                linkToDonate,
            },
        });
        if (!created) {
            res.status(409).send(`El usuario con id ${id} ya existe en la DB`);
        }
        else {
            console.log(`Nuevo usuario creado con name: ${name}`);
            res.status(200).send(newUser);
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
}));
router.post("/exists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        console.log(`Buscando si existe el usuario con id ${id}`);
        let user = yield index_1.default.User.findOne({
            where: {
                id: id,
            },
        });
        if (user === null) {
            console.log(`Usuario con id: ${id} no encontrado`);
            res.send({ msg: false });
        }
        else {
            console.log(`Usuario con id: ${id} encontrado.`);
            res.send({ msg: true });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a users/update`);
    console.log(`Me llegó por body: `);
    console.log(req.body);
    try {
        const { image, contact, city, email, name, id, linkToDonate } = req.body;
        const newProfile = yield index_1.default.User.update({
            image: image,
            contact: contact,
            city: city,
            email: email,
            name: name,
            linkToDonate: linkToDonate,
        }, {
            where: {
                id: id,
            },
        });
        res.status(200).send(newProfile);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.post("/getMultipleUserInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta /users/getMultipleUserInfo`);
    console.log(`req.body.id = ${req.body.id}`);
    try {
        if (req.body.id) {
            let userId = req.body.id;
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
            throw new Error(`El id '${req.body.id}' es falso.`);
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
        let allTheUsers = yield getAllUsers();
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
router.post("/points", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Estoy en /users/points.`);
    try {
        const { id } = req.body;
        const user = yield index_1.default.User.findOne({ where: { id: id } });
        if (user) {
            return res.status(200).send({ points: user.points });
        }
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
        let allTheUsers = yield getAllUsers();
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
router.post("/buyProducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Estoy en /users/buyProducts.`);
    try {
        const { userID, name, items, totalPoints, mail, direccion } = req.body;
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
                html: `<div>${msgMail}</div><div>Productos: ${items.map((i) => {
                    return i.title;
                })}</div><div>Puntos: ${totalPoints}</div><div>Muchas gracias de parte del equipo de mascotapp.</div>`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error)
                    console.log(error);
                else
                    console.log("Email enviado: " + info.response);
            });
            return res.status(200).send("compra realizada exitosamente");
        }
        return res.send("el usuario no existe");
    }
    catch (error) {
        console.log(`Error en /users/buyProducts. ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
router.post("/donatePoints", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Estoy en /users/donatePoints.`);
    try {
        const { id, idToDonate, pointsToDonate } = req.body;
        const user = yield index_1.default.User.findOne({ where: { id: id } });
        const userToDonate = yield index_1.default.User.findOne({ where: { id: idToDonate } });
        if (user && userToDonate && user.points >= pointsToDonate) {
            user.points = user.points - parseInt(pointsToDonate);
            yield user.save();
            userToDonate.points = userToDonate.points + parseInt(pointsToDonate);
            yield userToDonate.save();
            console.log("se donó");
            return res.status(200).send("puntos donados correctamente");
        }
        console.log("no se donó algo falló");
        return res.status(200).send("algo salió mal");
    }
    catch (error) {
        console.log(`Error en /users/donatePoints. ${error.message}`);
        return res.status(400).send(error.message);
    }
}));
exports.default = router;
