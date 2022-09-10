import express from "express";
import * as userServices from "../services/userServices";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("entré al get de users");
  try {
    let allUsers = userServices.getUsers();
    return res.status(200).send(allUsers);
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
});

router.get("/allpublicdata", (_req, res) => {
  console.log("entré al publicdata");
  try {
    let onlyPublicDataOfUsers = userServices.getOnlyPublicDataFromAllUsers();
    // console.log(onlyPublicDataOfUsers);
    return res.status(200).send(onlyPublicDataOfUsers);
  } catch (error: any) {
    return res.status(404).send(error.message);
  }
});

export default router;
