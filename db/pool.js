const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: "postgresql://mch332@localhost:5432/inventory",
});
