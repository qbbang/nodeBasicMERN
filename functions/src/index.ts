const functions = require("firebase-functions");

const runtimeOpts = {
  timeoutSeconds: 60,
  memory: '128MB'
}

process.env.DB_URL = process.env.DB_URL || functions.config().config?.db_url;

const server = require('../lib/backend/src/server_for_firebase');

exports.kstm = functions
  .runWith(runtimeOpts)
  .region('asia-northeast1')
  .https
  .onRequest(server.app);