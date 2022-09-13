"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const config = require(__dirname + "/config/config.js");
const app = require("./src/app");
// //----------------------------------------
// const createUsers = () => {
//   users.map((user) => {
//     db.User.create(user);
//   });
// };
// createUsers();
// let rex = db.Pet.findByPk("cd2fe99d-24d6-4d9a-983b-8cb8a1888a74")
//   .then((result: any) => console.log(result))
//   .catch((error: { message: any }) => console.log(error.message));
// console.log("soy rex: " + rex);
// async function rexiasincr() {
//   console.log("en rexiasinc!");
//   let rexi = await db.Pet.findByPk("cd2fe99d-24d6-4d9a-983b-8cb8a1888a74");
//   console.log("DESPUES DEL AWAIT!");
//   console.log(rexi);
//   return `SOY REXI!!!!: ${rexi}`;
// }
// rexiasincr();
// User.sync({ alter: true });
// sequelize.sync({ force: true });
// ---------------------------------------------
// !-------comento lo de arriba ---------
models_1.default.sequelize.sync().then(() => {
    app.listen(config.server.port, () => {
        console.log(`App listening on port ${config.server.port}`);
    });
});
// const createPets = () => {
//   petTS.map(async(pet) => {
//     console.log('in')
//     await db.PetTS.create(pet);
//   });
// };
// createPets();
