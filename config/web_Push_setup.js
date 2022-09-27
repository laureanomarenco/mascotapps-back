require("dotenv").config();
const {PUBLIC_KEY, PRIVATE_KEY} = process.env
const webPush = require("web-push")

webPush.setVapidDetails("service.mascotapp@gmail.com", PUBLIC_KEY, PRIVATE_KEY)

module.exports = webPush