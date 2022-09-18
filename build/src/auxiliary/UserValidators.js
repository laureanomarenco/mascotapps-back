"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkThumbnail = exports.checkAditionalContactInfo = exports.checkEmail = exports.isEmail = exports.checkFullName = exports.validateNewUser = void 0;
const AnimalValidators_1 = require("./AnimalValidators");
// interface UserAttributes {
//   id: string | undefined;
//   googleId: string | undefined;
//   displayName: string | undefined;
//   email: string | undefined;
//   name: string | undefined;
//   postalCode: string | undefined;
//   aditionalContactInfo: string | undefined;
//   thumbnail: string | undefined;
// }
function validateNewUser(profile) {
    try {
        let userFromReqChecked = {
            id: (0, AnimalValidators_1.checkId)(profile.id),
            googleId: (0, AnimalValidators_1.checkId)(profile.googleId),
            displayName: (0, AnimalValidators_1.checkName)(profile.displayName),
            email: checkEmail(profile._json.email),
            name: checkFullName(profile.name.givenName, profile.name.familyName),
            postalCode: profile.postalCode,
            aditionalContactInfo: checkAditionalContactInfo(profile.aditionalContactInfo),
            thumbnail: checkThumbnail(profile._json.picture),
        };
        return userFromReqChecked;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.validateNewUser = validateNewUser;
// Check givenName + familyName:
function checkFullName(givenName, familyName) {
    let namesConcatenated = `${givenName} ${familyName}`;
    if ((0, AnimalValidators_1.isUndefinedOrNull)(namesConcatenated)) {
        return undefined;
    }
    if ((0, AnimalValidators_1.isStringBetween1And101CharsLong)(namesConcatenated)) {
        return namesConcatenated;
    }
    throw new Error(`El nombre completo "${namesConcatenated}" no es un nombre válido. Debe tener un máximo de 100 characteres y ser una cadena de texto.`);
}
exports.checkFullName = checkFullName;
// Validate email:
function isEmail(argumento) {
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
    return regex.test(argumento);
}
exports.isEmail = isEmail;
function checkEmail(emailFromReq) {
    if ((0, AnimalValidators_1.isUndefinedOrNull)(emailFromReq)) {
        return undefined;
    }
    if (isEmail(emailFromReq)) {
        return emailFromReq;
    }
    throw new Error(`El email ingresado "${emailFromReq}" no es un email válido para el registro.`);
}
exports.checkEmail = checkEmail;
// Validate aditionalContactInfo
function checkAditionalContactInfo(aditionalContactInfoFromReq) {
    if ((0, AnimalValidators_1.isUndefinedOrNull)(aditionalContactInfoFromReq)) {
        return undefined;
    }
    if ((0, AnimalValidators_1.isString)(aditionalContactInfoFromReq)) {
        return aditionalContactInfoFromReq;
    }
    throw new Error(`La información de contacto adicional ingresada no es válida. Por favor, o deje el input completamente vacío o ingrese una cadena de texto.`);
}
exports.checkAditionalContactInfo = checkAditionalContactInfo;
// Validate Thumbnail:
function checkThumbnail(thumbnailFromReq) {
    if ((0, AnimalValidators_1.isUndefinedOrNull)(thumbnailFromReq)) {
        return undefined;
    }
    if ((0, AnimalValidators_1.isString)(thumbnailFromReq)) {
        return thumbnailFromReq;
    }
    throw new Error(`El thumbnail no es válido. Por favor, ingrese una cadena de texto, o deje el input completamente vacío.`);
}
exports.checkThumbnail = checkThumbnail;
