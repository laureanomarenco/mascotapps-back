"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFalsyArgument = exports.isStringBetween1AndXCharsLong = exports.isValidId = exports.isUndefinedOrNull = exports.isStringBetween1And50CharsLong = exports.isStringBetween1And101CharsLong = exports.isEmptyString = exports.isValidString = exports.isString = exports.isEmail = exports.isValidURLImage = void 0;
// IS VALID URL IMAGE:
function isValidURLImage(argumento) {
    if (typeof argumento !== "string") {
        return false;
    }
    return (argumento.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
        null);
}
exports.isValidURLImage = isValidURLImage;
//IS EMAIL:
function isEmail(argumento) {
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
    return regex.test(argumento);
}
exports.isEmail = isEmail;
// IS STRING:
function isString(argumento) {
    if (typeof argumento !== "string") {
        return false;
    }
    return true;
}
exports.isString = isString;
// IS VALID STRING:
function isValidString(argumento) {
    if (typeof argumento === "string" && argumento.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isValidString = isValidString;
// IS EMPTY STRING:
function isEmptyString(argumento) {
    if (typeof argumento === "string" && argumento.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmptyString = isEmptyString;
// IS STRING BETWEEN 1 AND 101 CHARS LONG
function isStringBetween1And101CharsLong(argumento) {
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= 100) {
        return true;
    }
    return false;
}
exports.isStringBetween1And101CharsLong = isStringBetween1And101CharsLong;
function isStringBetween1And50CharsLong(argumento) {
    if (typeof argumento === "string" &&
        argumento.length > 0 &&
        argumento.length <= 50) {
        return true;
    }
    else {
        return false;
    }
}
exports.isStringBetween1And50CharsLong = isStringBetween1And50CharsLong;
// is UNDEFINEDorNULL:
function isUndefinedOrNull(argumento) {
    if (argumento === undefined || argumento === null) {
        return true;
    }
    return false;
}
exports.isUndefinedOrNull = isUndefinedOrNull;
// IS VALID ID
function isValidId(argumento) {
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= 50) {
        return true;
    }
    return false;
}
exports.isValidId = isValidId;
// IS STRING BETWEEN 1 AND X CHARACTERS LONG:
function isStringBetween1AndXCharsLong(x, argumento) {
    let error = `The argument "x" must be a positive number`;
    if (!x || typeof x !== "number" || x < 1) {
        throw new Error(error);
    }
    let maxCharsLong = x;
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= maxCharsLong) {
        return true;
    }
    else {
        return false;
    }
}
exports.isStringBetween1AndXCharsLong = isStringBetween1AndXCharsLong;
// IS FALSY ARGUMENT
function isFalsyArgument(argumento) {
    if (!argumento) {
        return true;
    }
    else {
        return false;
    }
}
exports.isFalsyArgument = isFalsyArgument;
