import { Router } from "express";
import db from "../models/index";
// import axios from "axios";

const router = Router();

const getAllPets = async () => {
  try {
    const allPets = await db.Pet.findAll();
    // console.log(allPets);
    return allPets;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

router.get("/", async (req, res) => {
  console.log("entré al get de pets!");

  try {
    let allThePets = await getAllPets();
    // console.log(allThePets);

    return res.status(200).send(allThePets);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

export default router;
