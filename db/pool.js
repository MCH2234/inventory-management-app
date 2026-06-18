const { Pool } = require("pg");
const process = require("process");

process.loadEnvFile();
module.exports = new Pool({
  connectionString: process.env.db_URI,
});
