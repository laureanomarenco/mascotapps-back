"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlyPublicDataFromAllUsers = exports.getUsers = void 0;
const users_json_1 = __importDefault(require("./users.json"));
const users = users_json_1.default;
function getUsers() {
    return users;
}
exports.getUsers = getUsers;
// export const getUserById = (id: number): User | undefined => {
//   return undefined;
// };
function getOnlyPublicDataFromAllUsers() {
    console.log("entré a getOnlyPublicDataFromAllUsers()");
    let usersWithoutPrivateData = users.map((u) => {
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
exports.getOnlyPublicDataFromAllUsers = getOnlyPublicDataFromAllUsers;
