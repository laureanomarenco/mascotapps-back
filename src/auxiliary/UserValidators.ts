import { UserAttributes } from "../types/userTypes";
import {
  checkId,
  checkName,
  isString,
  isUndefinedOrNull,
} from "./AnimalValidators";

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

export function validateNewUser(reqBody: any): UserAttributes {
  try {
    let userFromReqChecked: UserAttributes = {
      id: checkId(reqBody.id),
      googleId: checkId(reqBody.googleId),
      displayName: checkName(reqBody.displayName),
      email: checkEmail(reqBody.email),
      name: checkName(reqBody.name),
      postalCode: reqBody.postalCode,
      aditionalContactInfo: checkAditionalContactInfo(
        reqBody.aditionalContactInfo
      ),
      thumbnail: checkThumbnail(reqBody.thumbnail),
    };
    return userFromReqChecked;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Validate email:
export function isEmail(argumento: any): boolean {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(argumento);
}

export function checkEmail(emailFromReq: any): string | undefined {
  if (isUndefinedOrNull(emailFromReq)) {
    return undefined;
  }
  if (isEmail(emailFromReq)) {
    return emailFromReq;
  }
  throw new Error(
    `El email ingresado "${emailFromReq}" no es un email válido para el registro.`
  );
}

export function checkAditionalContactInfo(
  aditionalContactInfoFromReq: any
): string | undefined {
  if (isUndefinedOrNull(aditionalContactInfoFromReq)) {
    return undefined;
  }
  if (isString(aditionalContactInfoFromReq)) {
    return aditionalContactInfoFromReq;
  }
  throw new Error(
    `La información de contacto adicional ingresada no es válida. Por favor, o deje el input completamente vacío o ingrese una cadena de texto.`
  );
}

export function checkThumbnail(thumbnailFromReq: any): string | undefined {
  if (isUndefinedOrNull(thumbnailFromReq)) {
    return undefined;
  }
  if (isString(thumbnailFromReq)) {
    return thumbnailFromReq;
  }
  throw new Error(
    `El thumbnail no es válido. Por favor, ingrese una cadena de texto, o deje el input completamente vacío.`
  );
}
