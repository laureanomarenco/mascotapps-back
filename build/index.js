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
const models_1 = __importDefault(require("./models"));
const config = require(__dirname + "/config/config.js");
const app = require("./src/app");
const AnimalValidators_1 = require("./src/auxiliary/AnimalValidators");
const animal_seeds_1 = require("./seeders/animal-seeds");
// sync({ alter: true })
// sync({ force: true })
models_1.default.sequelize.sync({ alter: true }).then(() => {
    app.listen(config.server.port, () => {
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
        console.log(`App listening on port ${config.server.port}`);
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
        console.log("**** **** **** **** **** Creando Animals con las semillas... :  **** **** **** ****");
        console.log("**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** ");
        animal_seeds_1.animalSeeds.forEach((pet) => __awaiter(void 0, void 0, void 0, function* () {
            let validatedPet = (0, AnimalValidators_1.validateNewPet)(pet);
            yield models_1.default.Animal.create(validatedPet);
        }));
        // users.forEach(async (user) => {
        //   agregar validate
        //   await db.User.create(user)
        // })
    });
});
// función que podría venir bien en algún momento, por eso la dejo comentada.
// const createAnimals = () => {
//   try {
//     animalsSeed.map(async (pet) => {
//       let validatedPet: Pet = validateNewPet(pet);
//       console.log("Soy validatedPet");
//       // console.log(validatedPet);
//       let createdPet = await db.Animal.create(validatedPet);
//       console.log(createdPet);
//     });
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };
