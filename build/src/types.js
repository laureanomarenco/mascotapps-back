"use strict";
// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
// export type Visibility = "great" | "good" | "ok" | "poor" | "very poor";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerosEnum = exports.Ages = exports.Races = exports.RelationState = exports.Visibility = exports.Weather = void 0;
var Weather;
(function (Weather) {
    Weather["Sunny"] = "sunny";
    Weather["Rainy"] = "rainy";
    Weather["Cloudy"] = "cloudy";
    Weather["Windy"] = "windy";
    Weather["Stormy"] = "stormy";
})(Weather = exports.Weather || (exports.Weather = {}));
var Visibility;
(function (Visibility) {
    Visibility["Great"] = "great";
    Visibility["Good"] = "good";
    Visibility["Ok"] = "ok";
    Visibility["Poor"] = "poor";
    Visibility["VeryPoor"] = "very poor";
})(Visibility = exports.Visibility || (exports.Visibility = {}));
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
var RelationState;
(function (RelationState) {
    RelationState["Single"] = "single";
    RelationState["Married"] = "married";
    RelationState["Divorced"] = "divorced";
    RelationState["Widow"] = "widow";
    RelationState["PartyLover"] = "party lover";
})(RelationState = exports.RelationState || (exports.RelationState = {}));
//-------MASCOTA-----------------------------------
var Races;
(function (Races) {
    Races["Labrador"] = "labrador";
    Races["OvejeroAleman"] = "ovejero alem\u00E1n";
    Races["ChowChow"] = "chow chow";
    Races["CanicheToy"] = "caniche toy";
    Races["Pitbull"] = "pitbull";
    Races["MastinNapolitano"] = "mast\u00EDn napolitano";
    Races["Mestizo"] = "mestizo";
    Races["Callejero"] = "callejero";
    Races["Otro"] = "otro";
})(Races = exports.Races || (exports.Races = {}));
var Ages;
(function (Ages) {
    Ages["Cachorro"] = "cachorro";
    Ages["Joven"] = "joven";
    Ages["Adulto"] = "adulto";
    Ages["Viejo"] = "viejo";
    Ages["Desconocido"] = "desconocido";
})(Ages = exports.Ages || (exports.Ages = {}));
var GenerosEnum;
(function (GenerosEnum) {
    GenerosEnum["Hembra"] = "hembra";
    GenerosEnum["Macho"] = "macho";
    GenerosEnum["Desconocido"] = "desconocido";
})(GenerosEnum = exports.GenerosEnum || (exports.GenerosEnum = {}));
const perrito = {
    name: "lopito",
    age: Ages.Joven,
    gender: "macho",
};
console.log(perrito);
let lokiMissing = {
    name: "loki",
    age: Ages.Joven,
    gender: "macho",
    missing: false,
};
console.log(lokiMissing);
