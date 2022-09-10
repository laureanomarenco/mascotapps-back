"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewestDiary = exports.getOldestDiary = exports.addDiary = exports.getEntriesWithoutSensitiveInfo = exports.findById = exports.getEntries = void 0;
const diaries_json_1 = __importDefault(require("./diaries.json"));
// lo primero que busca al imoprtar si no lo pongo la extensión del nombre del archivo: .tsx, ts, node, js, json
// En ECMASCRIPT Modules es obligatorio poner la extensión, pero en ts no.
const diaries = diaries_json_1.default; // le agrego el as Array<DiaryEntry> (aserción de types). Le estoy diciendo que yo sé que este json es de un type/interface en concreto. Por lo que le obligo a TS a considerar que esta constante tiene que funcionar de cierta forma. ESTO ES TíPICO CUANDO TRABAJO CON DATOS QUE ME CAEN DE AFUERA. Por lo que le tengo que decir a TS que tome a diaryData como un array de DiaryEntry. Hay que intentar evitar usar la aserción de types, pero a veces es necesario, como cuando hago un fetch..
const getEntries = () => diaries;
exports.getEntries = getEntries;
function findById(id) {
    const entry = diaries.find((d) => d.id === id);
    if (entry) {
        const { comment } = entry, restOfDiary = __rest(entry, ["comment"]); //dejo afuera comment
        return restOfDiary;
    }
    return undefined;
}
exports.findById = findById;
// export const getEntriesWithoutSensitiveInfo = () : NonSensitiveInfoDiaryEntry[] => diaries
function getEntriesWithoutSensitiveInfo() {
    //hago este map porque si no TS me retorna el objeto con el comments, por más de que yo le dije que tiene que retornar el type NonSensitiveInfoDiaryEntry.
    return diaries.map(({ id, date, weather, visibility }) => {
        return {
            id,
            date,
            weather,
            visibility,
        };
    });
}
exports.getEntriesWithoutSensitiveInfo = getEntriesWithoutSensitiveInfo;
const addDiary = (newDiaryEntry) => {
    const newDiary = Object.assign({ id: Math.max(...diaries.map((d) => d.id)) + 1 }, newDiaryEntry);
    diaries.push(newDiary);
    return newDiary;
};
exports.addDiary = addDiary;
const getOldestDiary = () => {
    let oldestDiaryId = Infinity;
    diaries.forEach((d) => {
        if (d.id < oldestDiaryId) {
            oldestDiaryId = d.id;
        }
    });
    let oldestDiary = findById(oldestDiaryId);
    return oldestDiary;
};
exports.getOldestDiary = getOldestDiary;
const getNewestDiary = () => {
    let newestDiaryId = -Infinity;
    diaries.forEach((d) => {
        if (d.id > newestDiaryId) {
            newestDiaryId = d.id;
        }
    });
    let newestDiary = findById(newestDiaryId);
    return newestDiary;
};
exports.getNewestDiary = getNewestDiary;
// export function getNewestDiary (): NonSensitiveInfoDiaryEntry | undefined {
//   let newestDiaryId = -Infinity;
//   diaries.forEach((d: DiaryEntry) => {
//     if (d.id > newestDiaryId) {
//       newestDiaryId = d.id;
//     }
//   });
//   let newestDiary = findById(newestDiaryId);
//   return newestDiary;
// }
// const diariesWithoutSensitiveInfo = getEntriesWithoutSensitiveInfo()
