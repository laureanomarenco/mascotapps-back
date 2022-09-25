import { UserAttributes } from "../types/userTypes";
 import {
   checkId,
   checkImageURL,
   checkName,
   isString,
   isStringBetween1And101CharsLong,
   isUndefinedOrNull,
 } from "./AnimalValidators";

 /* interface UserAttributes {
   id: string | undefined;
   email: string | undefined;
   name: string | undefined;
   image: string | undefined;
   contact: string | undefined;
 } */

 export function validateUser(profile: any): UserAttributes {
   try {
     let userFromReqChecked: UserAttributes = {
       id: checkId(profile.id),
       email: checkEmail(profile.email),
       name: checkFullName(profile.name),
       image: checkImageURL(profile.image),
       contact: checkAditionalContactInfo(profile.contact),
       city: profile.city,
       isDonator: profile.isDonator
     };
     return userFromReqChecked;
   } catch (error: any) {
     throw new Error(error.message);
   }
 }

  //Check givenName + familyName:
 export function checkFullName(givenName: any): string | undefined {
   if (givenName.length < 3) {
     throw new Error("El nombre debe contener minimo 3 caracteres")
   }
   if (isStringBetween1And101CharsLong(givenName)) {
     return givenName;
   }
   throw new Error(
     `El nombre "${givenName}" no es un nombre válido. Debe tener un máximo de 100 characteres y ser una cadena de texto.`
   );
 }

  //Validate email:
 export function isEmail(argumento: any): boolean {
   let regex = new RegExp(
     "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
   );
   return regex.test(argumento);
 }

 export function checkEmail(emailFromReq: any): string | undefined {
   if (isUndefinedOrNull(emailFromReq)) {
     throw new Error("El campo mail no debe estar vacio");
   }
   if (isEmail(emailFromReq)) {
     return emailFromReq;
   }
   throw new Error(
     `El email ingresado "${emailFromReq}" no es un email válido para el registro.`
   );
 }

 export function isNumber(argumento:any){
    let regex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g
    return regex.test(argumento)
 }
  //Validate aditionalContactInfo
 export function checkAditionalContactInfo(contact: any): string | undefined {
   if (isUndefinedOrNull(contact)) {
     return undefined;
   }
   if (isNumber(contact)) {
     return contact;
   }
   throw new Error(
     `La información de contacto adicional ingresada no es válida. Por favor, o deje el input completamente vacío o ingrese una cadena de texto.`
   );
 }

