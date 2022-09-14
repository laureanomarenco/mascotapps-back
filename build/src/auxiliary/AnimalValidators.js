"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkId = exports.checkName = exports.checkComments = exports.checkImageURL = exports.checkVaccinationSchemeStatus = exports.checkRace = exports.checkAge = exports.checkGender = exports.checkStatus = exports.checkSpecies = exports.validateNewPet = void 0;
const petTypes_1 = require("../types/petTypes");
//! VALIDAR TODO EL PET ENTERO:
// SI HAY UN ERROR, DEVOLVER UN ERROR.
// SI ESTÁ TODO OK, DEVOLVER EL OBJETO VALIDADO (pet nueva a crear)
function validateNewPet(reqBody) {
    try {
        let petFromReqChecked = {
            id: checkId(reqBody.id),
            name: checkName(reqBody.name),
            specie: checkSpecies(reqBody.specie),
            race: checkRace(reqBody.race),
            age: checkAge(reqBody.age),
            gender: checkGender(reqBody.gender),
            status: checkStatus(reqBody.status),
            vaccinationSchemeStatus: checkVaccinationSchemeStatus(reqBody.vaccinationSchemeStatus),
            image: checkImageURL(reqBody.image),
            comments: reqBody.comments,
        };
        return petFromReqChecked;
    }
    catch (error) {
        throw new Error(`${error.message}`);
    }
}
exports.validateNewPet = validateNewPet;
//! FUNCIONES VALIDADORAS DE PROPIEDADES que usa la función validateNewPet:
//------- function de prueba para //! SPECIE:
function isSpecies(argumento) {
    return Object.values(petTypes_1.Species).includes(argumento);
}
function checkSpecies(speciesFromReq) {
    if (!isSpecies(speciesFromReq)) {
        throw new Error(`La especie introducida "${speciesFromReq}" no es válida.`);
    }
    return speciesFromReq;
}
exports.checkSpecies = checkSpecies;
//-----funciones de chequeo de //! STATUS:
function isStatus(argumento) {
    return Object.values(petTypes_1.Status).includes(argumento);
}
function checkStatus(statusFromReq) {
    if (!isStatus(statusFromReq)) {
        throw new Error(`El status ingresado "${statusFromReq}" es inválido`);
    }
    return statusFromReq;
}
exports.checkStatus = checkStatus;
// OK ------ funciones de chequeo de gender:
function isGender(argumento) {
    return Object.values(petTypes_1.Genders).includes(argumento);
}
function checkGender(genderFromReq) {
    if (isUndefinedOrNull(genderFromReq)) {
        return undefined;
    }
    if (isGender(genderFromReq)) {
        return genderFromReq;
    }
    throw new Error(`El género ingresado "${genderFromReq}" es inválido`);
}
exports.checkGender = checkGender;
//-----funciones de chequeo de age:
function isAge(argumento) {
    return Object.values(petTypes_1.Ages).includes(argumento);
}
function checkAge(ageFromReq) {
    if (isUndefinedOrNull(ageFromReq)) {
        return undefined;
    }
    if (isAge(ageFromReq)) {
        return ageFromReq;
    }
    throw new Error(`La edad/age ingresada "${ageFromReq}" es inválido`);
}
exports.checkAge = checkAge;
//-----funciones de chequeo de race:
function checkRace(raceFromReq) {
    if (isUndefinedOrNull(raceFromReq)) {
        return undefined;
    }
    if (isStringBetween1And101CharsLong(raceFromReq)) {
        return raceFromReq;
    }
    throw new Error(`La raza/race ingresada "${raceFromReq} no es válida.`);
}
exports.checkRace = checkRace;
//----- funciones de chequeo de vaccinationSchemeStatus:
function isVaccSchemeStatus(argumento) {
    return Object.values(petTypes_1.VaccinationStatus).includes(argumento);
}
function checkVaccinationSchemeStatus(vaccSchStatusFromReq) {
    if (isUndefinedOrNull(vaccSchStatusFromReq)) {
        return undefined;
    }
    if (isVaccSchemeStatus(vaccSchStatusFromReq)) {
        return vaccSchStatusFromReq;
    }
    throw new Error(`Los datos de esquema de vacunación "${vaccSchStatusFromReq}" ingresados no son válidos.`);
}
exports.checkVaccinationSchemeStatus = checkVaccinationSchemeStatus;
//------funciones de chequeo de image:
function isValidURL(argumento) {
    if (typeof argumento !== "string") {
        return false;
    }
    return (argumento.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
        null);
}
function checkImageURL(imageFromReq) {
    if (isUndefinedOrNull(imageFromReq)) {
        return undefined;
    }
    if (isValidURL(imageFromReq)) {
        return imageFromReq;
    }
    throw new Error(`la URL de imagen ingresada "${imageFromReq}" no es válida`);
}
exports.checkImageURL = checkImageURL;
//-----funciones de chequeo de comments:
function checkComments(commentsFromReq) {
    if (isUndefinedOrNull(commentsFromReq)) {
        return undefined;
    }
    if (isString(commentsFromReq) &&
        commentsFromReq.length > 1 &&
        commentsFromReq.length < 3001) {
        return commentsFromReq;
    }
    throw new Error(`El comentario ingresado no es válido. Ingrese únicamente texto de entre 1 y 3000 caracteres de largo.`);
}
exports.checkComments = checkComments;
//-----funciones de chequeo de name:
function checkName(nameFromReq) {
    if (isUndefinedOrNull(nameFromReq)) {
        return undefined;
    }
    if (isStringBetween1And101CharsLong(nameFromReq)) {
        return nameFromReq;
    }
    throw new Error(`El nombre/name ingresado "${nameFromReq}" no es válido`);
}
exports.checkName = checkName;
//-----funciones de chequeo de id:
function isValidId(argumento) {
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= 50) {
        return true;
    }
    return false;
}
function checkId(idFromReq) {
    if (isUndefinedOrNull(idFromReq)) {
        return undefined;
    }
    if (isValidId(idFromReq)) {
        return idFromReq;
    }
    throw new Error(`El id ingresado "${idFromReq}" no es válido.`);
}
exports.checkId = checkId;
//! is STRING:
function isString(argumento) {
    if (typeof argumento !== "string") {
        return false;
    }
    return true;
}
//! funcion auxiliar para chequear strings y su largo
function isStringBetween1And101CharsLong(argumento) {
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= 100) {
        return true;
    }
    return false;
}
//! is UNDEFINEDorNULL:
function isUndefinedOrNull(argumento) {
    if (argumento === undefined || argumento === null) {
        return true;
    }
    return false;
}
