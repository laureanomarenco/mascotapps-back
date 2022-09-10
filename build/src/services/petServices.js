"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPetById = exports.addNewPet = exports.getAllPets = void 0;
const pets_json_1 = __importDefault(require("./pets.json"));
const allThePets = pets_json_1.default;
function getAllPets() {
    let allPets = allThePets;
    return allPets;
}
exports.getAllPets = getAllPets;
function addNewPet(newPetEntry) {
    const newPet = Object.assign({ id: Math.max(...allThePets.map((p) => p.id)) + 1 }, newPetEntry);
    allThePets.push(newPet);
    return newPet;
}
exports.addNewPet = addNewPet;
function getPetById(id) {
    const petFilteredById = allThePets.find((pet) => pet.id == id);
    return petFilteredById;
}
exports.getPetById = getPetById;
