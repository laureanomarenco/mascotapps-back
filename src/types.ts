// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
// export type Visibility = "great" | "good" | "ok" | "poor" | "very poor";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
  VeryPoor = "very poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, "id" | "date" | "weather" | "visibility">
export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

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

//------USER----------------------------------------

export enum RelationState {
  Single = "single",
  Married = "married",
  Divorced = "divorced",
  Widow = "widow",
  PartyLover = "party lover",
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  age: number;
  relationState: RelationState;
  privateHobbies: string[];
}

export type OnlyPublicDataOfUser = Omit<User, "privateHobbies">;

//-------MASCOTA-----------------------------------

export enum Races {
  Labrador = "labrador",
  OvejeroAleman = "ovejero alemán",
  ChowChow = "chow chow",
  CanicheToy = "caniche toy",
  Pitbull = "pitbull",
  MastinNapolitano = "mastín napolitano",
  Mestizo = "mestizo",
  Callejero = "callejero",
  Otro = "otro",
}

export enum Ages {
  Cachorro = "cachorro",
  Joven = "joven",
  Adulto = "adulto",
  Viejo = "viejo",
  Desconocido = "desconocido",
}

export type Genero = "hembra" | "macho" | "desconocido"; //desconocido en caso de haber visto el animal por la calle perdido pero no pudiendo parar a chequear (posible mascota perdida)

export enum GenerosEnum {
  Hembra = "hembra",
  Macho = "macho",
  Desconocido = "desconocido",
}

export type VaccinationSchemeStatus = "completo" | "incompleto" | "desconocido";

export type NewPetEntry = Omit<Pet, "id">;

export interface Pet {
  id: number;
  name: string | undefined;
  race: Races;
  age: Ages;
  gender: Genero;
  lookingForTheOriginalOwner: true | false;
  missing: true | false;
  forAdoption: true | false;
  vaccinationSchemeStatus?: VaccinationSchemeStatus;
  comments?: string;
}

//----------- EXPERIMENTOS Y PRUEBAS: ------------
export interface PetReviewed extends Pet {
  review: string;
}

export interface Mascotita {
  name: string;
  age: Ages;
  gender: Genero;
  comments?: string; //esta propiedad es opcional. Puede o no estar.
}

const perrito: Mascotita = {
  name: "lopito",
  age: Ages.Joven,
  gender: "macho",
};
console.log(perrito);

interface Extraviada {
  missing: boolean;
}

type MascotitaPerdida = Mascotita & Extraviada;

let lokiMissing: MascotitaPerdida = {
  name: "loki",
  age: Ages.Joven,
  gender: "macho",
  missing: false,
};
console.log(lokiMissing);
