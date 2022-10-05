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
  endpoints: Text;
  linkToDonate: string | undefined;
  isBanned: string | undefined;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
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
  endpoints: Text;
  isBanned: string | undefined;
  isAdmin?: boolean;
}

export interface IContactInfoOfOwner {
  name: string | undefined;
  email: string | undefined;
  city: string | undefined;
  image: string | undefined;
  contact: string | undefined;
  isDonator: string | undefined;
  linkToDonate: string | undefined;
  reviews: any;
}
