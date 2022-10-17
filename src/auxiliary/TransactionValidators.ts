import { ITransaction } from "../types/transactionTypes";
import { isValidURL } from "./AnimalValidators";
import { isValidString } from "./ReviewValidators";
// import { checkStatus } from "./AnimalValidators";

export function validateNewTransaction(obj: any): ITransaction {
  console.log(`validateNewTransaction...`);
  try {
    let transactionFromReqChecked: ITransaction = {
      user_offering_id: checkUserOfferingId(obj.user_offering_id),
      user_offering_name: checkUserName(obj.user_offering_name),
      user_demanding_id: checkUserDemandingId(obj.user_demanding_id),
      user_demanding_name: checkUserName(obj.user_demanding_name),
      status: checkStatus(obj.status),
      pet_id: checkPetId(obj.pet_id),
      pet_name: checkPetName(obj.pet_name),
      pet_image: checkPetImage(obj.pet_image),
      user_offering_check: checkUserOfferingCheck(obj.user_offering_check),
      user_demanding_check: checkUserDemandingCheck(obj.user_demanding_check),
    };
    console.log(
      `Validaciones de newTransaction realizadas. Retornando transactionFromReqChecked...`
    );
    return transactionFromReqChecked;
  } catch (error: any) {
    console.log(
      `Error en la function validateNewTransaction: ${error.message}`
    );
    throw new Error(
      `Error en la function validateNewTransaction: ${error.message}`
    );
  }
}

function checkPetImage(arg: any): string | undefined {
  if (isValidURL(arg)) {
    return arg;
  }
  if (isUndefinedOrNull(arg)) {
    return undefined;
  }
  throw new Error(
    `Error al validar la pet_image. Ingresó "${arg}" lo cual no pasó las validaciones.`
  );
}

function checkUserName(arg: string): string | undefined {
  if (isValidStringId(arg)) {
    return arg;
  }
  if (isUndefinedOrNull(arg)) {
    return undefined;
  } else {
    throw new Error(
      `Error al validar el User Name. Ingresó ${arg} y no es válido.`
    );
  }
}

// function isValidName(arg: any): boolean {}

function checkPetName(arg: any) {
  if (isValidStringId(arg)) {
    return arg;
  } else {
    throw new Error(
      `Error de validación de petName es function ValidateNewTransaction. El name de la mascota es ${arg} y debe ser un string con length mayor a 0 y menor a 100.`
    );
  }
}

//! is UNDEFINEDorNULL:
export function isUndefinedOrNull(argumento: any): boolean {
  if (argumento === undefined || argumento === null) {
    return true;
  }
  return false;
}

//! is EMPTY STRING:
export function isEmptyString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length === 0) {
    return true;
  } else {
    return false;
  }
}

function isValidStringId(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length > 0 &&
    argumento.length < 100
  ) {
    return true;
  } else {
    return false;
  }
}

function checkUserOfferingId(userOfferingFromReq: any) {
  if (isValidStringId(userOfferingFromReq)) {
    return userOfferingFromReq;
  } else {
    throw new Error(
      `El valor user_offering_id "${userOfferingFromReq}" no es válido.`
    );
  }
}

function checkUserDemandingId(userDemandingFromReq: any) {
  if (isValidStringId(userDemandingFromReq)) {
    return userDemandingFromReq;
  } else {
    throw new Error(
      `El valor user_demanding_id "${userDemandingFromReq}" no es válido.`
    );
  }
}

function checkPetId(petIdFromReq: any) {
  if (isValidStringId(petIdFromReq)) {
    return petIdFromReq;
  } else {
    throw new Error(`El pet id "${petIdFromReq}" no es válido.`);
  }
}

//! Tengo que mejorar esta validación! La dejo provisoria!!!!
function checkStatus(statusFromReq: any) {
  if (isValidStringId(statusFromReq)) {
    return statusFromReq;
  } else {
    throw new Error(`El status ingresado "${statusFromReq}" no es válido`);
  }
}

function checkUserOfferingCheck(userOfferingCheckFromReq: any) {
  if (isUndefinedOrNull(userOfferingCheckFromReq)) {
    return undefined;
  }
  if (isEmptyString(userOfferingCheckFromReq)) {
    return undefined;
  }
  if (isValidStringId(userOfferingCheckFromReq)) {
    return userOfferingCheckFromReq;
  }
  console.log(`Error en el checkUserOfferingCheck`);
  throw new Error(
    `El user_offering_check "${userOfferingCheckFromReq}"no es válido.`
  );
}

function checkUserDemandingCheck(userDemandingFromReq: any) {
  if (isUndefinedOrNull(userDemandingFromReq)) {
    return undefined;
  }
  if (isEmptyString(userDemandingFromReq)) {
    return undefined;
  }
  if (isValidStringId(userDemandingFromReq)) {
    return userDemandingFromReq;
  }
  console.log(`Error en el checkUserDemandingCheck`);
  throw new Error(
    `El user_offering_check "${userDemandingFromReq}"no es válido.`
  );
}
