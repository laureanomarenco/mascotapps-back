import { ITransaction } from "../types/transactionTypes";
// import { checkStatus } from "./AnimalValidators";

export function validateNewTransaction(reqBody: any): ITransaction {
  console.log(`validateNewTransaction...`);
  try {
    let transactionFromReqChecked: ITransaction = {
      user_offering_id: checkUserOfferingId(reqBody.user_offering_id),
      user_demanding_id: checkUserDemandingId(reqBody.user_demanding_id),
      status: checkStatus(reqBody.status),
      pet_id: checkPetId(reqBody.pet_id),
      user_offering_check: checkUserOfferingCheck(reqBody.user_offering_check),
      user_demanding_check: checkUserDemandingCheck(
        reqBody.user_demanding_check
      ),
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

//  id: undefined | string;
//     user_offering_id!: string;
//     user_demanding_id!: string;
//     status!: string;
//     pet_id!: string;
//     user_offering_check!: string | undefined;
//     user_demanding_check!: string | undefined;

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
