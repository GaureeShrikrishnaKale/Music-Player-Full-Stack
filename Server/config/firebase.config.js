const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
const router = require("../routes/auth");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;