import { checkServerIdentity } from "tls";
import {
  Ages,
  Genders,
  Pet,
  Species,
  Status,
  VaccinationStatus,
} from "../types/petTypes";
import { isEmptyString } from "./ReviewValidators";

//! VALIDAR TODO EL PET ENTERO:
// SI HAY UN ERROR, DEVOLVER UN ERROR.
// SI ESTÁ TODO OK, DEVOLVER EL OBJETO VALIDADO (pet nueva a crear)

export function validateNewPet(reqBody: any): Pet {
  try {
    let petFromReqChecked: Pet = {
      id: checkId(reqBody.id),
      name: checkName(reqBody.name),
      specie: checkSpecies(reqBody.specie),
      race: checkRace(reqBody.race),
      city: reqBody.city,
      age: checkAge(reqBody.age),
      gender: checkGender(reqBody.gender),
      status: checkStatus(reqBody.status),
      vaccinationSchemeStatus: checkVaccinationSchemeStatus(
        reqBody.vaccinationSchemeStatus
      ),
      image: reqBody.image,
      backWithItsOwner: undefined,
      withNewOwner: undefined,
      comments: reqBody.comments,
      wasTransacted: undefined,
    };
    return petFromReqChecked;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

//! FUNCIONES VALIDADORAS DE PROPIEDADES que usa la función validateNewPet:

//------- function de prueba para //! SPECIE:
function isSpecies(argumento: any): boolean {
  return Object.values(Species).includes(argumento);
}
export function checkSpecies(speciesFromReq: any): Species {
  if (!isSpecies(speciesFromReq)) {
    throw new Error(`La especie introducida "${speciesFromReq}" no es válida.`);
  }
  return speciesFromReq;
}

//-----funciones de chequeo de //! STATUS:
function isStatus(argumento: any): boolean {
  return Object.values(Status).includes(argumento);
}
export function checkStatus(statusFromReq: any): Status {
  if (!isStatus(statusFromReq)) {
    throw new Error(`El status ingresado "${statusFromReq}" es inválido`);
  }
  return statusFromReq;
}

// OK ------ funciones de chequeo de gender:
function isGender(argumento: any): boolean {
  return Object.values(Genders).includes(argumento);
}
export function checkGender(genderFromReq: any): Genders | undefined {
  if (isUndefinedOrNull(genderFromReq)) {
    return undefined;
  }
  if (isGender(genderFromReq)) {
    return genderFromReq;
  }
  throw new Error(`El género ingresado "${genderFromReq}" es inválido`);
}

//-----funciones de chequeo de age:
function isAge(argumento: any): boolean {
  return Object.values(Ages).includes(argumento);
}

export function checkAge(ageFromReq: any): Ages | undefined {
  if (isUndefinedOrNull(ageFromReq)) {
    return undefined;
  }
  if (isAge(ageFromReq)) {
    return ageFromReq;
  }
  throw new Error(`La edad/age ingresada "${ageFromReq}" es inválido`);
}

//-----funciones de chequeo de race:
export function checkRace(raceFromReq: any): string | undefined {
  if (isUndefinedOrNull(raceFromReq)) {
    return undefined;
  }
  if (isStringBetween1And101CharsLong(raceFromReq)) {
    return raceFromReq;
  }
  throw new Error(`La raza/race ingresada "${raceFromReq} no es válida.`);
}

//----- funciones de chequeo de vaccinationSchemeStatus:
function isVaccSchemeStatus(argumento: any): boolean {
  return Object.values(VaccinationStatus).includes(argumento);
}

export function checkVaccinationSchemeStatus(
  vaccSchStatusFromReq: any
): VaccinationStatus | undefined {
  if (isUndefinedOrNull(vaccSchStatusFromReq)) {
    return undefined;
  }
  if (isVaccSchemeStatus(vaccSchStatusFromReq)) {
    return vaccSchStatusFromReq;
  }
  throw new Error(
    `Los datos de esquema de vacunación "${vaccSchStatusFromReq}" ingresados no son válidos.`
  );
}

//------funciones de chequeo de image:
export function isValidURL(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return (
    argumento.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
    null
  );
}

export function checkImageURL(imageFromReq: any): string | undefined {
  if (isUndefinedOrNull(imageFromReq)) {
    return undefined;
  }
  if (isValidURL(imageFromReq)) {
    return imageFromReq;
  }
  throw new Error(`la URL de imagen ingresada "${imageFromReq}" no es válida`);
}

//-----funciones de chequeo de comments:

export function checkComments(commentsFromReq: any): string | undefined {
  if (isUndefinedOrNull(commentsFromReq)) {
    return undefined;
  }
  if (
    isString(commentsFromReq) &&
    commentsFromReq.length > 1 &&
    commentsFromReq.length < 3001
  ) {
    return commentsFromReq;
  }
  throw new Error(
    `El comentario ingresado no es válido. Ingrese únicamente texto de entre 1 y 3000 caracteres de largo.`
  );
}

//-----funciones de chequeo de name:

export function checkName(nameFromReq: any): string | undefined {
  if (isUndefinedOrNull(nameFromReq) || isEmptyString(nameFromReq)) {
    return undefined;
  }
  if (isStringBetween1And101CharsLong(nameFromReq)) {
    return nameFromReq;
  }
  throw new Error(`El nombre/name ingresado "${nameFromReq}" no es válido`);
}

//-----funciones de chequeo de id:
export function isValidId(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= 50
  ) {
    return true;
  }
  return false;
}

export function checkId(idFromReq: any): string | undefined {
  if (isUndefinedOrNull(idFromReq)) {
    return undefined;
  }
  if (isValidId(idFromReq)) {
    return idFromReq;
  }
  throw new Error(`El id ingresado "${idFromReq}" no es válido.`);
}

//! is STRING:
export function isString(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return true;
}

//! funcion auxiliar para chequear strings y su largo
export function isStringBetween1And101CharsLong(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= 100
  ) {
    return true;
  }
  return false;
}

//! is UNDEFINEDorNULL:
export function isUndefinedOrNull(argumento: any): boolean {
  if (argumento === undefined || argumento === null) {
    return true;
  }
  return false;
}
