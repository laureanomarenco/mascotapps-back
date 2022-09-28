//---------   MASCOTA: -----------------------------------

export enum Ages {
  Cachorro = "muy joven",
  Joven = "joven",
  Adulto = "adulto",
  Viejo = "viejo",
  Desconocido = "desconocido",
}

export enum Genders {
  Hembra = "hembra",
  Macho = "macho",
}

export enum Species {
  Perro = "perro",
  Gato = "gato",
  Ave = "ave",
  Reptil = "reptíl",
  Roedor = "roedor",
  Otra = "otra especie",
}

export enum Status {
  Perdido = "perdido",
  Encontrado = "encontrado",
  enAdopcion = "en adopción",
}

export enum postStatus {
  Active = "activo",
  Cancel = "cancelado",
  Success = "concretado",
}

// El tamaño depende de la raza. Aunque si es raza "otro" o "mestizo", no podríamos definir el tamaño.
// Cómo hacemos para poder filtrar por tamaño en perros? Para gatos no importa.

//Crear una interface para perros y otra para gatos y otra para "otros"?
export enum Size {
  Chico = "chico",
  Mediano = "mediano",
  Grande = "grande",
  MuyGrande = "muy grande",
}

// export type VaccinationSchemeStatus = "completo" | "incompleto" | "desconocido";

export enum VaccinationStatus {
  Completo = "completo",
  Incompleto = "incompleto",
  Desconocido = "desconocido",
}

export type NewPetEntry = Omit<Pet, "id">;

export interface Pet {
  id: string | undefined; //! Le damos la opción al cliente de setear su id al string q quiera
  name: string | undefined;
  specie: Species; //! OBLIGATORIO
  race: string | undefined;
  city: string | undefined;
  age: Ages | undefined;
  gender: Genders | undefined;
  status: Status; //! OBLIGATORIO
  vaccinationSchemeStatus: VaccinationStatus | undefined;
  image: string | undefined;
  comments: string | undefined;
  withNewOwner: undefined | true;
  backWithItsOwner: undefined | true;
  postStatus: undefined | postStatus;
}

export interface IPetOfUser {
  id: string | undefined;
  name: string | undefined;
  city: string | undefined;
  specie: string;
  race: string | undefined;
  age: Ages | undefined;
  gender: Genders | undefined;
  status: Status;
  vaccinationSchemeStatus: VaccinationStatus | undefined;
  image: string | undefined;
  comments: string | undefined;
  withNewOwner: undefined | true;
  backWithItsOwner: undefined | true;
  postStatus: undefined | postStatus;
}

//--------- Interfaces y types para "Otros": -----------
//! Si la especie no es gato ni perro, que se use la interface de Pet.
//! Si la specie === "gato", que use la interface de Pet entendida a Cat. Lo mismo para "dog"...
//? PERO ESTA ES UNA MALA IDEA. MEJOR USAR LA INTERFACE DE PET ÚNICAMENTE.

//----------- EXPERIMENTOS Y PRUEBAS: ------------
// export interface PetReviewed extends Pet {
//   review: string;
// }

// console.log(perrito);

// console.log(lokiMissing);

// ----NOTAS Y COMENTARIOS DE TYPES, INTERFACES, OMIT, ETC PARA EL USO DE TypeScript: ---------------------

// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, "id" | "date" | "weather" | "visibility">
// export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;

// export type NewDiaryEntry = Omit<DiaryEntry, "id">;

//Cuándo debo utilizar types y/o interface?? Estudiar mejor los detalles, pero básicamente Midudev dice...:
// La interface está pensada para ser extendida: Por ejemplo:
// interface SpecialDiaryEntry extends DiaryEntry {
//   flightNumber: number;
// y acá también tendría todo lo que tiene DiaryEntry
// }

// En cambio, los types están mejor para cosas más estáticas. Ya que si quisiese hacer lo mismo con types, debería hacer esto:
// type SpecialDiaryEntry2 = DiaryEntry & {
//   flightNumber: number;
// };
// Y esto de acá arriba queda medio raro utilizado de esta manera.

// export type OnlyPublicDataOfUser = Omit<User, "privateHobbies">;
