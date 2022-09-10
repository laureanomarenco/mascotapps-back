import { NewDiaryEntry, Visibility, Weather } from "./types";

function parseComment(commentFromRequest: any): string {
  if (!isString(commentFromRequest)) {
    throw new Error("Incorrect or missing comment");
  }
  return commentFromRequest;
}

function parseDate(dateFromRequest: any): string {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error("Incorrect or missing date");
  }
  return dateFromRequest;
}

function parseWeather(weatherFromRequest: any): Weather {
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error("incorrect or missing WEATHER");
  }
  return weatherFromRequest;
}

function parseVisibility(visibilityFromRequest: any): Visibility {
  if (
    !isString(visibilityFromRequest) ||
    !isVisibility(visibilityFromRequest)
  ) {
    throw new Error("incorrect or missing VISIBILITY");
  }
  return visibilityFromRequest;
}

function isVisibility(argumento: any): boolean {
  return Object.values(Visibility).includes(argumento);
}

function isWeather(argumento: any): boolean {
  return Object.values(Weather).includes(argumento);
}

function isString(string: string): boolean {
  if (typeof string === "string") {
    return true;
  } else {
    return false;
  }
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function toNewDiaryEntry(object: any): NewDiaryEntry {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  };
  return newEntry;
}

export default toNewDiaryEntry;
