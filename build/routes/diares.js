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
const diaryServices = __importStar(require("../services/diaryServices"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});
router.get("/diarymasviejo", (_req, res) => {
    console.log("entré al diarymasviejo");
    try {
        const oldestDiary = diaryServices.getOldestDiary();
        return res.status(200).send(oldestDiary);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
router.get("/diarymasnuevo", (_req, res) => {
    console.log("entré al diarymasnuevo");
    try {
        const newestDiary = diaryServices.getNewestDiary();
        return res.status(200).send(newestDiary);
    }
    catch (error) {
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
        const newDiaryEntry = (0, utils_1.default)(req.body);
        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);
        res.json(addedDiaryEntry);
    }
    catch (error) {
        res.status(400).send(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.default = router;
