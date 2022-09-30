"use strict";
//---------   MASCOTA: -----------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaccinationStatus = exports.Size = exports.postStatus = exports.Status = exports.Species = exports.Genders = exports.Ages = void 0;
var Ages;
(function (Ages) {
    Ages["Cachorro"] = "muy joven";
    Ages["Joven"] = "joven";
    Ages["Adulto"] = "adulto";
    Ages["Viejo"] = "viejo";
    Ages["Desconocido"] = "desconocido";
})(Ages = exports.Ages || (exports.Ages = {}));
var Genders;
(function (Genders) {
    Genders["Hembra"] = "hembra";
    Genders["Macho"] = "macho";
})(Genders = exports.Genders || (exports.Genders = {}));
var Species;
(function (Species) {
    Species["Perro"] = "perro";
    Species["Gato"] = "gato";
    Species["Ave"] = "ave";
    Species["Reptil"] = "rept\u00EDl";
    Species["Roedor"] = "roedor";
    Species["Otra"] = "otra especie";
})(Species = exports.Species || (exports.Species = {}));
var Status;
(function (Status) {
    Status["Perdido"] = "perdido";
    Status["Encontrado"] = "encontrado";
    Status["enAdopcion"] = "en adopci\u00F3n";
})(Status = exports.Status || (exports.Status = {}));
var postStatus;
(function (postStatus) {
    postStatus["Active"] = "activo";
    postStatus["Cancel"] = "cancelado";
    postStatus["Success"] = "concretado";
})(postStatus = exports.postStatus || (exports.postStatus = {}));
// El tamaño depende de la raza. Aunque si es raza "otro" o "mestizo", no podríamos definir el tamaño.
// Cómo hacemos para poder filtrar por tamaño en perros? Para gatos no importa.
//Crear una interface para perros y otra para gatos y otra para "otros"?
var Size;
(function (Size) {
    Size["Chico"] = "chico";
    Size["Mediano"] = "mediano";
    Size["Grande"] = "grande";
    Size["MuyGrande"] = "muy grande";
})(Size = exports.Size || (exports.Size = {}));
// export type VaccinationSchemeStatus = "completo" | "incompleto" | "desconocido";
var VaccinationStatus;
(function (VaccinationStatus) {
    VaccinationStatus["Completo"] = "completo";
    VaccinationStatus["Incompleto"] = "incompleto";
    VaccinationStatus["Desconocido"] = "desconocido";
})(VaccinationStatus = exports.VaccinationStatus || (exports.VaccinationStatus = {}));
