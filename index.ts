import db from "./models";
const config = require(__dirname + "/config/config.js");
const app = require("./src/app");

import { validateNewPet } from "./src/auxiliary/AnimalValidators";
import { animalSeeds } from "./seeders/animal-seeds";
import { users } from "./seeders/users-seed";

// sync({ alter: true })
// sync({ force: true })

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(config.server.port, () => {
    console.log(
      "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
    );
    console.log(`App listening on port ${config.server.port}`);
    console.log(
      "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
    );
    console.log(
      "**** **** **** **** **** Creando Animals con las semillas... :  **** **** **** ****"
    );
    console.log(
      "**** **** **** **** **** **** **** **** **** **** **** **** **** **** **** "
    );

    animalSeeds.forEach(async (pet) => {
      let validatedPet = validateNewPet(pet);
      await db.Animal.create(validatedPet);
    });
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
