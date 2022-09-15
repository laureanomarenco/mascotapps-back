export interface UserAttributes {
  id: string | undefined;
  googleId: string | undefined;
  displayName: string | undefined;
  email: string | undefined;
  name: string | undefined;
  postalCode: string | undefined;
  aditionalContactInfo: string | undefined;
  thumbnail: string | undefined;
}

// ESTA INTERFACE ESTÁ EN DESUSO YA QUE SE USA DIRECTAMENTE EN EL ../models/user.ts, pero hice una copia de la que está en models y la traje para acá así la importo a donde quiera y la puedo usar de comparación de types.
