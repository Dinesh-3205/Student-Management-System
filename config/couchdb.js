process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nano = require("nano");

if (!process.env.COUCHDB_URL) {
  throw new Error("COUCHDB_URL missing in .env");
}

const couch = nano({
  url: process.env.COUCHDB_URL,
  requestDefaults: {
    timeout: 15000
  }
});

const db = couch.db.use(process.env.COUCHDB_DB);

module.exports = db;
