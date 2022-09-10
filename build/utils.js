"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function parseComment(commentFromRequest) {
    if (!isString(commentFromRequest)) {
        throw new Error("Incorrect or missing comment");
    }
    return commentFromRequest;
}
function parseDate(dateFromRequest) {
    if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
        throw new Error("Incorrect or missing date");
    }
    return dateFromRequest;
}
function parseWeather(weatherFromRequest) {
    if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
        throw new Error("incorrect or missing WEATHER");
    }
    return weatherFromRequest;
}
function parseVisibility(visibilityFromRequest) {
    if (!isString(visibilityFromRequest) ||
        !isVisibility(visibilityFromRequest)) {
        throw new Error("incorrect or missing VISIBILITY");
    }
    return visibilityFromRequest;
}
function isVisibility(argumento) {
    return Object.values(types_1.Visibility).includes(argumento);
}
function isWeather(argumento) {
    return Object.values(types_1.Weather).includes(argumento);
}
function isString(string) {
    if (typeof string === "string") {
        return true;
    }
    else {
        return false;
    }
}
function isDate(date) {
    return Boolean(Date.parse(date));
}
function toNewDiaryEntry(object) {
    const newEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility),
    };
    return newEntry;
}
exports.default = toNewDiaryEntry;
