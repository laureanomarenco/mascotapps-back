import {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveInfoDiaryEntry,
} from "../types";
import diaryData from "./diaries.json";

// lo primero que busca al imoprtar si no lo pongo la extensión del nombre del archivo: .tsx, ts, node, js, json
// En ECMASCRIPT Modules es obligatorio poner la extensión, pero en ts no.

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>; // le agrego el as Array<DiaryEntry> (aserción de types). Le estoy diciendo que yo sé que este json es de un type/interface en concreto. Por lo que le obligo a TS a considerar que esta constante tiene que funcionar de cierta forma. ESTO ES TíPICO CUANDO TRABAJO CON DATOS QUE ME CAEN DE AFUERA. Por lo que le tengo que decir a TS que tome a diaryData como un array de DiaryEntry. Hay que intentar evitar usar la aserción de types, pero a veces es necesario, como cuando hago un fetch..

export const getEntries = () => diaries;

export function findById(id: number): NonSensitiveInfoDiaryEntry | undefined {
  const entry = diaries.find((d) => d.id === id);
  if (entry) {
    const { comment, ...restOfDiary } = entry; //dejo afuera comment
    return restOfDiary;
  }
  return undefined;
}

// export const getEntriesWithoutSensitiveInfo = () : NonSensitiveInfoDiaryEntry[] => diaries
export function getEntriesWithoutSensitiveInfo(): NonSensitiveInfoDiaryEntry[] {
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

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  };
  diaries.push(newDiary);
  return newDiary;
};

export const getOldestDiary = (): NonSensitiveInfoDiaryEntry | undefined => {
  let oldestDiaryId = Infinity;
  diaries.forEach((d: DiaryEntry) => {
    if (d.id < oldestDiaryId) {
      oldestDiaryId = d.id;
    }
  });
  let oldestDiary = findById(oldestDiaryId);
  return oldestDiary;
};

export const getNewestDiary = (): NonSensitiveInfoDiaryEntry | undefined => {
  let newestDiaryId = -Infinity;
  diaries.forEach((d: DiaryEntry) => {
    if (d.id > newestDiaryId) {
      newestDiaryId = d.id;
    }
  });
  let newestDiary = findById(newestDiaryId);
  return newestDiary;
};

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
