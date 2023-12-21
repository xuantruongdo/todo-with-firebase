const functions = require("firebase-functions")

const { onRequest } = require("firebase-functions/v2/https");
const apiHandler = require("./config/apiHandler");

exports.api = functions.https.onRequest(apiHandler.callback());
