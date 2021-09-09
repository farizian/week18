require('dotenv').config();

const env = {
  host: process.env.host,
  db_username: process.env.db_username,
  db_password: process.env.db_password,
  token: process.env.token,
  pwtoken: process.env.pwtoken,
};

module.exports = env;
