

// Require Dependencies
import env from "mandatoryenv"
import express from "express"
import { applyMiddleware } from './middleware/index';

const functions = require("firebase-functions");
process.env.DB_URL = process.env.DB_URL || functions.config().config?.db_url;

// Load .env Enviroment Variables to process.env
env.load([
    'DB_URL',
]);
const app = express();

// 환경변수 로딩 후 import 해줘야하는 것들..
import commonHandler from './middleware/common.handler';
import errorHandler from './middleware/error.handler';

applyMiddleware(commonHandler, app);
applyMiddleware(errorHandler, app);

const runtimeOpts = {
  timeoutSeconds: 60,
  memory: '128MB'
}

exports.kstm = functions
  .runWith(runtimeOpts)
  .region('asia-northeast1')
  .https
  .onRequest(app);