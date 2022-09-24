import { Router } from "express";
import db from "../../models/index";
import { IReview } from "../types/reviewTypes";

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
  console.log(`Entré a la ruta GET /reviews/allReviews`);
  try {
    let allReviews = await getAllReviews();
    return res.status(200).send(allReviews);
  } catch (error: any) {
    console.log(`Error en /reviews/allReviews`);
    return res.status(404).send(error.message);
  }
});

router.post("/newReview", async (req, res) => {
  console.log(`Entré a la ruta POST /reviews/newReview`);
  try {
    console.log(`req.body = ${req.body}`);
    let newReview = await db.Review.create(req.body);
    console.log(`Nueva Review creada:`);
    console.log(newReview);
    return res.status(200).send(newReview);
  } catch (error: any) {
    console.log(`Error en ruta /newReview. Error message: ${error.message}`);
    return res.status(404).send(error.message);
  }
});

export default router;
