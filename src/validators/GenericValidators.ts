// IS VALID URL IMAGE:
export function isValidURLImage(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return (
    argumento.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
    null
  );
}

//IS EMAIL:
export function isEmail(argumento: any): boolean {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(argumento);
}

// IS STRING:
export function isString(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return true;
}

// IS VALID STRING:
export function isValidString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length > 0) {
    return true;
  } else {
    return false;
  }
}

// IS EMPTY STRING:
export function isEmptyString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length === 0) {
    return true;
  } else {
    return false;
  }
}

// IS STRING BETWEEN 1 AND 101 CHARS LONG
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

export function isStringBetween1And50CharsLong(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length > 0 &&
    argumento.length <= 50
  ) {
    return true;
  } else {
    return false;
  }
}

// is UNDEFINEDorNULL:
export function isUndefinedOrNull(argumento: any): boolean {
  if (argumento === undefined || argumento === null) {
    return true;
  }
  return false;
}

// IS VALID ID
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

// IS STRING BETWEEN 1 AND X CHARACTERS LONG:
export function isStringBetween1AndXCharsLong(
  x: number,
  argumento: any
): boolean {
  let error = `The argument "x" must be a positive number`;
  if (!x || typeof x !== "number" || x < 1) {
    throw new Error(error);
  }
  let maxCharsLong = x;
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= maxCharsLong
  ) {
    return true;
  } else {
    return false;
  }
}

// IS FALSY ARGUMENT
export function isFalsyArgument(argumento: any): boolean {
  if (!argumento) {
    return true;
  } else {
    return false;
  }
}
