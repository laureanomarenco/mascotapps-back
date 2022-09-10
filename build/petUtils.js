"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPetEntry = void 0;
const types_1 = require("./types");
function isString(string) {
    if (typeof string === "string") {
        return true;
    }
    else {
        return false;
    }
}
function parsePetName(nameFromRequest) {
    if (!isString(nameFromRequest) && !nameFromRequest === undefined) {
        throw new Error("The name must be a string or undefined");
    }
    return nameFromRequest;
}
function parsePetRace(raceFromRequest) {
    if (!isRace(raceFromRequest)) {
        throw new Error("The race " + raceFromRequest + " is invalid.");
    }
    return raceFromRequest;
}
function isRace(argumento) {
    return Object.values(types_1.Races).includes(argumento);
}
function isAge(argumento) {
    return Object.values(types_1.Ages).includes(argumento);
}
function parsePetAge(ageFromRequest) {
    if (!isAge(ageFromRequest)) {
        throw new Error("Age es inválida");
    }
    return ageFromRequest;
}
function isGender(argumento) {
    return Object.values(types_1.GenerosEnum).includes(argumento); //cómo puedo lograr algo igual pero con types?
}
function parsePetGender(genderFromRequest) {
    if (!isGender) {
        throw new Error("El género de la mascota no es válida");
    }
    return genderFromRequest;
}
function isLookingOriginalOwner(argumento) {
    if (argumento !== true && argumento !== false) {
        throw new Error("parameter must be a boolean true or false");
    }
    return true;
}
function parseOriginalOwner(lookingForOriginalOwnerFromRequest) {
    if (!isLookingOriginalOwner(lookingForOriginalOwnerFromRequest)) {
        throw new Error("Parametro inválido en lookingForTheOriginalOwner");
    }
    return lookingForOriginalOwnerFromRequest;
}
function parseMissing(missingFromRequest) {
    if (missingFromRequest !== true && missingFromRequest !== false) {
        throw new Error("la propiedad missing debe ser un booleano true o false");
    }
    return missingFromRequest;
}
function parseForAdoption(forAdoptionFromRequest) {
    if (forAdoptionFromRequest !== true && forAdoptionFromRequest !== false) {
        throw new Error("la propiedad for adoption debe ser (boolean) true o false.");
    }
    return forAdoptionFromRequest;
}
function toNewPetEntry(obj) {
    const newEntry = {
        name: parsePetName(obj.name),
        race: parsePetRace(obj.race),
        age: parsePetAge(obj.age),
        gender: parsePetGender(obj.gender),
        lookingForTheOriginalOwner: parseOriginalOwner(obj.lookingForTheOriginalOwner),
        missing: parseMissing(obj.missing),
        forAdoption: parseForAdoption(obj.forAdoption),
        // vaccinationSchemeStatus: parseVaccination(obj.vaccinationSchemeStatus),
        // comments: parseComments(obj.comments),
    };
    return newEntry;
}
exports.toNewPetEntry = toNewPetEntry;
