"use strict";
//---------   MASCOTA: -----------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatRaces = exports.DogRaces = exports.VaccinationStatus = exports.Size = exports.Status = exports.Species = exports.Genders = exports.Ages = void 0;
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
    Genders["Desconocido"] = "desconocido";
})(Genders = exports.Genders || (exports.Genders = {}));
var Species;
(function (Species) {
    Species["Perro"] = "perro";
    Species["Gato"] = "gato";
    Species["Otra"] = "otra especie";
})(Species = exports.Species || (exports.Species = {}));
var Status;
(function (Status) {
    Status["Perdido"] = "perdido";
    Status["PosiblementePerdido"] = "posiblemente perdido";
    Status["Encontrado"] = "encontrado";
    Status["enAdopcion"] = "en adopci\u00F3n";
})(Status = exports.Status || (exports.Status = {}));
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
var DogRaces;
(function (DogRaces) {
    DogRaces["Labrador"] = "labrador";
    DogRaces["OvejeroAleman"] = "ovejero alem\u00E1n";
    DogRaces["ChowChow"] = "chow chow";
    DogRaces["CanicheToy"] = "caniche toy";
    DogRaces["Pitbull"] = "pitbull";
    DogRaces["MastinNapolitano"] = "mast\u00EDn napolitano";
    DogRaces["Mestizo"] = "mestizo";
    DogRaces["Callejero"] = "callejero";
    DogRaces["Otro"] = "otro";
})(DogRaces = exports.DogRaces || (exports.DogRaces = {}));
var CatRaces;
(function (CatRaces) {
    CatRaces["Abisinio"] = "abisinio";
    CatRaces["AmericanShorthair"] = "American shorthair";
    CatRaces["AngoraTurco"] = "angora turco";
    CatRaces["Bengala"] = "bengala";
    CatRaces["BobtailDelMekong"] = "bobtail del Mekong";
    CatRaces["Bombay"] = "bombay";
    CatRaces["BosqueDeNoruega"] = "bosque de noruega";
    CatRaces["Burmilla"] = "burmilla";
    CatRaces["Caracal"] = "caracal";
    CatRaces["AzulRuso"] = "gato azul ruso";
    CatRaces["Persa"] = "persa";
    CatRaces["Otro"] = "otro";
})(CatRaces = exports.CatRaces || (exports.CatRaces = {}));
const perrito = {
    name: "lopito",
    age: Ages.Joven,
    gender: "macho",
};
let lokiMissing = {
    name: "loki",
    age: Ages.Joven,
    gender: "macho",
    missing: false,
};
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
