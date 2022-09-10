import express from "express";
import * as diaryServices from "../services/diaryServices";
import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});

router.get("/diarymasviejo", (_req, res) => {
  console.log("entré al diarymasviejo");

  try {
    const oldestDiary = diaryServices.getOldestDiary();
    return res.status(200).send(oldestDiary);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

router.get("/diarymasnuevo", (_req, res) => {
  console.log("entré al diarymasnuevo");

  try {
    const newestDiary = diaryServices.getNewestDiary();
    return res.status(200).send(newestDiary);
  } catch (error: any) {
    return res.status(403).send(error.message);
  }
});

router.get("/:id", (req, res) => {
  console.log("entré al buscar por :id params");
  console.log(":id es " + req.params.id);

  const diaryFoundById = diaryServices.findById(Number(req.params.id));
  return diaryFoundById != null
    ? res.send(diaryFoundById)
    : res.sendStatus(404);
});

router.post("/", (req, res) => {
  console.log(req.body);
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);
    res.json(addedDiaryEntry);
  } catch (error: any) {
    res.status(400).send(error?.message);
  }
});

export default router;
