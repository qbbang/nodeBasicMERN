"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Require Dependencies
var mandatoryenv_1 = __importDefault(require("mandatoryenv"));
var express_1 = __importDefault(require("express"));
var index_1 = require("./middleware/index");
var functions = require("firebase-functions");
process.env.DB_URL = process.env.DB_URL || ((_a = functions.config().config) === null || _a === void 0 ? void 0 : _a.db_url);
// Load .env Enviroment Variables to process.env
mandatoryenv_1.default.load([
    'DB_URL',
]);
var app = express_1.default();
// 환경변수 로딩 후 import 해줘야하는 것들..
var common_handler_1 = __importDefault(require("./middleware/common.handler"));
var error_handler_1 = __importDefault(require("./middleware/error.handler"));
index_1.applyMiddleware(common_handler_1.default, app);
index_1.applyMiddleware(error_handler_1.default, app);
var runtimeOpts = {
    timeoutSeconds: 60,
    memory: '128MB'
};
exports.kstm = functions
    .runWith(runtimeOpts)
    .region('asia-northeast1')
    .https
    .onRequest(app);
