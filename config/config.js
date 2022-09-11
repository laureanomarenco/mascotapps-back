require("dotenv").config();

// console.log(process.env.DB_USER);
const port = process.env.PORT || 3001;

module.exports = {
  server: {
    port: port
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "masco",
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    "use_env_variable": "DATABASE_URL"
  },
};
