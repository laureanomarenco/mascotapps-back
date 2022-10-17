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

    // animalSeeds.forEach(async (pet) => {
    //   let validatedPet = validateNewPet(pet);
    //   await db.Animal.create(validatedPet);
    // });
  });
});
