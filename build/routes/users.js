"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServices = __importStar(require("../services/userServices"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    console.log("entré al get de users");
    try {
        let allUsers = userServices.getUsers();
        return res.status(200).send(allUsers);
    }
    catch (error) {
        return res.status(401).send(error.message);
    }
});
router.get("/allpublicdata", (_req, res) => {
    console.log("entré al publicdata");
    try {
        let onlyPublicDataOfUsers = userServices.getOnlyPublicDataFromAllUsers();
        // console.log(onlyPublicDataOfUsers);
        return res.status(200).send(onlyPublicDataOfUsers);
    }
    catch (error) {
        return res.status(404).send(error.message);
    }
});
exports.default = router;
