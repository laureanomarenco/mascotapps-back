require("dotenv").config();
const {PRIVATE_KEY} = process.env

PUBLIC_KEY = BBdVJOoIKvsEDiJcbrNBuakK2qOotO8f7j4mTfiAk25SH8z0OQcxKlkUb3NJnetnMy5DYk0d0Ns2ffC69zfcGrE

const webPush = require("web-push")

webPush.setVapidDetails("mailto:service.mascotapp@gmail.com", PUBLIC_KEY, PRIVATE_KEY)

module.exports = webPush