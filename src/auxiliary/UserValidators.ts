// import { UserAttributes } from "../types/userTypes";
// import {
//   checkId,
//   checkName,
//   isString,
//   isStringBetween1And101CharsLong,
//   isUndefinedOrNull,
// } from "./AnimalValidators";

// // interface UserAttributes {
// //   id: string | undefined;
// //   googleId: string | undefined;
// //   displayName: string | undefined;
// //   email: string | undefined;
// //   name: string | undefined;
// //   postalCode: string | undefined;
// //   aditionalContactInfo: string | undefined;
// //   thumbnail: string | undefined;
// // }

// export function validateNewUser(profile: any): UserAttributes {
//   try {
//     let userFromReqChecked: UserAttributes = {
//       id: checkId(profile.id),
//       //displayName: checkName(profile.displayName),
//       email: checkEmail(profile._json.email),
//       name: checkFullName(profile.name.givenName, profile.name.familyName),
//       password: ,
//       postalCode: profile.postalCode,
//       aditionalContactInfo: checkAditionalContactInfo(
//         profile.aditionalContactInfo
//       ),
//       thumbnail: checkThumbnail(profile._json.picture),
//     };
//     return userFromReqChecked;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

// // Check givenName + familyName:
// export function checkFullName(
//   givenName: any,
//   familyName: any
// ): string | undefined {
//   let namesConcatenated = `${givenName} ${familyName}`;
//   if (isUndefinedOrNull(namesConcatenated)) {
//     return undefined;
//   }
//   if (isStringBetween1And101CharsLong(namesConcatenated)) {
//     return namesConcatenated;
//   }
//   throw new Error(
//     `El nombre completo "${namesConcatenated}" no es un nombre válido. Debe tener un máximo de 100 characteres y ser una cadena de texto.`
//   );
// }

// // Validate email:
// export function isEmail(argumento: any): boolean {
//   let regex = new RegExp(
//     "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
//   );
//   return regex.test(argumento);
// }

// export function checkEmail(emailFromReq: any): string | undefined {
//   if (isUndefinedOrNull(emailFromReq)) {
//     return undefined;
//   }
//   if (isEmail(emailFromReq)) {
//     return emailFromReq;
//   }
//   throw new Error(
//     `El email ingresado "${emailFromReq}" no es un email válido para el registro.`
//   );
// }

// // Validate aditionalContactInfo
// export function checkAditionalContactInfo(
//   aditionalContactInfoFromReq: any
// ): string | undefined {
//   if (isUndefinedOrNull(aditionalContactInfoFromReq)) {
//     return undefined;
//   }
//   if (isString(aditionalContactInfoFromReq)) {
//     return aditionalContactInfoFromReq;
//   }
//   throw new Error(
//     `La información de contacto adicional ingresada no es válida. Por favor, o deje el input completamente vacío o ingrese una cadena de texto.`
//   );
// }

// // Validate Thumbnail:
// export function checkThumbnail(thumbnailFromReq: any): string | undefined {
//   if (isUndefinedOrNull(thumbnailFromReq)) {
//     return undefined;
//   }
//   if (isString(thumbnailFromReq)) {
//     return thumbnailFromReq;
//   }
//   throw new Error(
//     `El thumbnail no es válido. Por favor, ingrese una cadena de texto, o deje el input completamente vacío.`
//   );
// }
