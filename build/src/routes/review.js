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
const express_1 = require("express");
const index_1 = __importDefault(require("../../models/index"));
const ReviewValidators_1 = require("../auxiliary/ReviewValidators");
const router = (0, express_1.Router)();
//-----  FUNCIONES AUXILIARES: -------------------------------
function getAllReviews() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allTheReviewsFromDB = yield index_1.default.Review.findAll();
            return allTheReviewsFromDB;
        }
        catch (error) {
            console.log(`Error en function getAllReviews. Error message: ${error.message} `);
            throw new Error(error.message);
        }
    });
}
//------  RUTAS: -----------------------------------------------
router.get("/allReviews", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta GET /reviews/allReviews`);
    try {
        let allReviews = yield getAllReviews();
        return res.status(200).send(allReviews);
    }
    catch (error) {
        console.log(`Error en /reviews/allReviews`);
        return res.status(404).send(error.message);
    }
}));
router.post("/newReview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Entré a la ruta POST /reviews/newReview`);
    try {
        // REQ.BODY:
        // transaction_id!: string;
        // reviewer_id!: string;
        // reviewed_id!: string;
        // comments: string | undefined;
        // stars!: number | string
        console.log(`req.body = ${req.body}`);
        let { reviewed_id, reviewer_id, transaction_id } = req.body;
        const transaction = yield index_1.default.Transaction.findByPk(transaction_id);
        if ((reviewer_id === transaction.user_offering_id && reviewed_id === transaction.user_demanding_id)
            || (reviewer_id === transaction.user_demanding_id && reviewed_id === transaction.user_offering_id)) {
            let validatedReview = (0, ReviewValidators_1.validateNewReview)(req.body);
            let newReview = yield index_1.default.Review.create(validatedReview);
            yield newReview.setUser(reviewed_id);
            console.log(`Nueva Review creada:`);
            console.log(newReview);
            return res.status(200).send(newReview);
        }
        return res.status(404).send({ msg: 'transacción no valida para estos usuarios.' });
    }
    catch (error) {
        console.log(`Error en ruta /newReview. Error message: ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
router.post("/getReviewsToUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`En /reviews/getReviewsToUser`);
    console.log(`req.body = ${req.body}`);
    try {
        console.log(`user id = ${req.body.id}`);
        if (!req.body.id) {
            throw new Error(`el req.body.id "${req.body.id}" enviado por body es falso.`);
        }
        let userId = req.body.id;
        let reviewsToUser = yield index_1.default.Review.getAll({
            where: {
                reviewed_id: userId,
            },
        });
        return res.status(200).send(reviewsToUser);
    }
    catch (error) {
        console.log(`Error en /reviews/getReviewsOfUser. ${error.message}`);
        return res.status(404).send(error.message);
    }
}));
exports.default = router;
