import {
  Ages,
  Races,
  Genero,
  // VaccinationSchemeStatus,
  // Pet,
  NewPetEntry,
  // PetReviewed,
  GenerosEnum,
} from "./types";

function isString(string: string): boolean {
  if (typeof string === "string") {
    return true;
  } else {
    return false;
  }
}

function parsePetName(nameFromRequest: any): string | undefined {
  if (!isString(nameFromRequest) && !nameFromRequest === undefined) {
    throw new Error("The name must be a string or undefined");
  }
  return nameFromRequest;
}

function parsePetRace(raceFromRequest: any): Races {
  if (!isRace(raceFromRequest)) {
    throw new Error("The race " + raceFromRequest + " is invalid.");
  }
  return raceFromRequest;
}

function isRace(argumento: any): boolean {
  return Object.values(Races).includes(argumento);
}

function isAge(argumento: any): boolean {
  return Object.values(Ages).includes(argumento);
}

function parsePetAge(ageFromRequest: any): Ages {
  if (!isAge(ageFromRequest)) {
    throw new Error("Age es inválida");
  }
  return ageFromRequest;
}

function isGender(argumento: any): boolean {
  return Object.values(GenerosEnum).includes(argumento); //cómo puedo lograr algo igual pero con types?
}

function parsePetGender(genderFromRequest: any): Genero {
  if (!isGender) {
    throw new Error("El género de la mascota no es válida");
  }
  return genderFromRequest;
}

function isLookingOriginalOwner(argumento: any): boolean {
  if (argumento !== true && argumento !== false) {
    throw new Error("parameter must be a boolean true or false");
  }
  return true;
}

function parseOriginalOwner(
  lookingForOriginalOwnerFromRequest: any
): true | false {
  if (!isLookingOriginalOwner(lookingForOriginalOwnerFromRequest)) {
    throw new Error("Parametro inválido en lookingForTheOriginalOwner");
  }
  return lookingForOriginalOwnerFromRequest;
}

function parseMissing(missingFromRequest: any): true | false {
  if (missingFromRequest !== true && missingFromRequest !== false) {
    throw new Error("la propiedad missing debe ser un booleano true o false");
  }
  return missingFromRequest;
}

function parseForAdoption(forAdoptionFromRequest: any): true | false {
  if (forAdoptionFromRequest !== true && forAdoptionFromRequest !== false) {
    throw new Error(
      "la propiedad for adoption debe ser (boolean) true o false."
    );
  }
  return forAdoptionFromRequest;
}

export function toNewPetEntry(obj: any): NewPetEntry {
  const newEntry: NewPetEntry = {
    name: parsePetName(obj.name),
    race: parsePetRace(obj.race),
    age: parsePetAge(obj.age),
    gender: parsePetGender(obj.gender),
    lookingForTheOriginalOwner: parseOriginalOwner(
      obj.lookingForTheOriginalOwner
    ),
    missing: parseMissing(obj.missing),
    forAdoption: parseForAdoption(obj.forAdoption),
    // vaccinationSchemeStatus: parseVaccination(obj.vaccinationSchemeStatus),
    // comments: parseComments(obj.comments),
  };
  return newEntry;
}
