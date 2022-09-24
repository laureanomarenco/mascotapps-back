import { Router } from "express";
import db from "../../models/index";

const router = Router();

//-----  FUNCIONES AUXILIARES: -------------------------------

async function getAllReviews() {
  try {
    let allTheReviewsFromDB = await db.Review.findAll();
    return allTheReviewsFromDB;
  } catch (error: any) {
    console.log(
      `Error en function getAllReviews. Error message: ${error.message} `
    );
    throw new Error(error.message);
  }
}

//------  RUTAS: -----------------------------------------------
router.get("/allReviews", async (req, res) => {
  console.log(`Entré a la ruta /reviews/allReviews`);
  try {
    let allReviews = await getAllReviews();
    return res.status(200).send(allReviews);
  } catch (error: any) {
    console.log(`Error en /reviews/allReviews`);
    return res.status(404).send(error.message);
  }
});

export default router;
