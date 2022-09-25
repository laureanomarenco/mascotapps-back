export interface UserAttributes {
  id: string;
  email: string;
  name: string | undefined;
  city: string | undefined;
  contact: string | undefined;
  image: string | undefined;
  isDonator: string | undefined;
}

export interface ISomeUserInfo {
  name: string | undefined;
  city: string | undefined;
  image: string | undefined;
  contact: string | undefined;
  isDonator: string | undefined;
}

export interface IContactInfoOfOwner {
  name: string | undefined;
  email: string | undefined;
  city: string | undefined;
  image: string | undefined;
  contact: string | undefined;
  isDonator: string | undefined;
}
