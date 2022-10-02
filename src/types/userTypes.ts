export interface UserAttributes {
  id: string;
  email: string;
  name: string | undefined;
  city: string | undefined;
  contact: string | undefined;
  image: string | undefined;
  isDonator: string | undefined;
  isAdopter: number | undefined;
  gaveUpForAdoption: number | undefined;
  foundAPet: number | undefined;
  gotAPetBack: number | undefined;
  points: number | undefined;
<<<<<<< HEAD
  endpoints: string;
=======
  linkToDonate: string | undefined;
>>>>>>> 4cc23b9d44371026c71b539fdae67ef4da05251b
}

export interface ISomeUserInfo {
  name: string | undefined;
  city: string | undefined;
  image: string | undefined;
  contact: string | undefined;
  isDonator: string | undefined;
  isAdopter: number | undefined;
  gaveUpForAdoption: number | undefined;
  foundAPet: number | undefined;
  gotAPetBack: number | undefined;
  points: number | undefined;
  linkToDonate: string | undefined;
}

export interface IContactInfoOfOwner {
  name: string | undefined;
  email: string | undefined;
  city: string | undefined;
  image: string | undefined;
  contact: string | undefined;
  isDonator: string | undefined;
  reviews: any;
}
