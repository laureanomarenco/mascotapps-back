import { User, OnlyPublicDataOfUser } from "../types";
import usersData from "./users.json";

const users: Array<User> = usersData as Array<User>;

export function getUsers() {
  return users;
}

// export const getUserById = (id: number): User | undefined => {
//   return undefined;
// };

export function getOnlyPublicDataFromAllUsers(): OnlyPublicDataOfUser[] {
  console.log("entré a getOnlyPublicDataFromAllUsers()");
  let usersWithoutPrivateData = users.map((u: User) => {
    return {
      id: u.id,
      name: u.name,
      lastName: u.lastName,
      age: u.age,
      relationState: u.relationState,
    };
  });
  // console.log(usersWithoutPrivateData);
  return usersWithoutPrivateData;
}
