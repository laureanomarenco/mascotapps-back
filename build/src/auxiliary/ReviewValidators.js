"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyString = exports.isUndefinedOrNull = exports.isValidString = exports.validateNewReview = void 0;
function validateNewReview(reqBody) {
    try {
        let reviewFromReqChecked = {
            transaction_id: checkTransactionId(reqBody.transaction_id),
            reviewer_id: checkReviewerId(reqBody.reviewer_id),
            comments: checkComments(reqBody.comments),
            stars: checkStars(reqBody.stars),
        };
        return reviewFromReqChecked;
    }
    catch (error) {
        console.log(`Error en la function validateNewReview. ${error.message}`);
        throw new Error(`Error en la function validateNewReview. ${error.message}`);
    }
}
exports.validateNewReview = validateNewReview;
function isValidString(argumento) {
    if (typeof argumento === "string" && argumento.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isValidString = isValidString;
//! is UNDEFINEDorNULL:
function isUndefinedOrNull(argumento) {
    if (argumento === undefined || argumento === null) {
        return true;
    }
    return false;
}
exports.isUndefinedOrNull = isUndefinedOrNull;
//! is EMPTY STRING:
function isEmptyString(argumento) {
    if (typeof argumento === "string" && argumento.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmptyString = isEmptyString;
function isValidStarNumber(argumento) {
    let argToNumber = Number(argumento);
    if (Number.isInteger(argToNumber) && argToNumber <= 5 && argToNumber >= 1) {
        return true;
    }
    else {
        return false;
    }
}
function checkStars(starsFromReq) {
    if (isValidStarNumber(starsFromReq)) {
        return Number(starsFromReq);
    }
    else {
        throw new Error(`El número de calificación ingresado no es válido`);
    }
}
function checkComments(commentsFromReq) {
    if (isUndefinedOrNull(commentsFromReq)) {
        return undefined;
    }
    if (isEmptyString(commentsFromReq)) {
        return undefined;
    }
    if (isValidString(commentsFromReq) && commentsFromReq.length < 1000) {
        return commentsFromReq;
    }
    throw new Error(`El comentario ingresado no es válido. Asegúrese de que tenga menos de 1000 caracteres y que sea una cadena de texto o undefined`);
}
function checkReviewedId(reviewedIdFromReq) {
    if (!isValidString(reviewedIdFromReq)) {
        throw new Error(`El reviewed Id "${reviewedIdFromReq}" ingresado no es válido.`);
    }
    else {
        return reviewedIdFromReq;
    }
}
function checkReviewerId(reviewerIdFromReq) {
    if (!isValidString(reviewerIdFromReq)) {
        throw new Error(`El reviewer Id "${reviewerIdFromReq}" ingresado no es válido.`);
    }
    else {
        return reviewerIdFromReq;
    }
}
function checkTransactionId(transactionIdFromReq) {
    if (!isValidString(transactionIdFromReq)) {
        throw new Error(`El transaction_id "${transactionIdFromReq}"no es válido.`);
    }
    else {
        return transactionIdFromReq;
    }
}
