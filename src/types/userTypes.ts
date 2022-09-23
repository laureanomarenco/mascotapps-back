export interface UserAttributes {
  id: string;
  email: string;
  name: string | undefined;
  city: string | undefined;
  contact: string | undefined;
  image: string | undefined;
}

export interface SomeUserInfo {
  name: string | undefined;
  city: string | undefined;
  image: string | undefined;
  contact: string | undefined;
}
