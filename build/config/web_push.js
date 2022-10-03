"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { PUBLIC_KEY, PRIVATE_KEY } = process.env;
const webPush = require("web-push");
webPush.setVapidDetails("mailto:service.mascotapp@gmail.com", PUBLIC_KEY, PRIVATE_KEY);
exports.default = webPush;
