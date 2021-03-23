"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require Dependencies
var mandatoryenv_1 = __importDefault(require("mandatoryenv"));
var express_1 = __importDefault(require("express"));
var index_1 = require("./middleware/index");
// Load .env Enviroment Variables to process.env
mandatoryenv_1.default.load([
    'DB_URL',
    'SERVER_PORT',
    'SECRET'
]);
var SERVER_PORT = process.env.SERVER_PORT;
var app = express_1.default();
// 환경변수 로딩 후 import 해줘야하는 것들..
var common_handler_1 = __importDefault(require("./middleware/common.handler"));
var error_handler_1 = __importDefault(require("./middleware/error.handler"));
var log_handler_1 = __importDefault(require("./middleware/log.handler"));
index_1.applyMiddleware(log_handler_1.default, app);
index_1.applyMiddleware(common_handler_1.default, app);
index_1.applyMiddleware(error_handler_1.default, app);
// Open Server on configurated Port
app.listen(SERVER_PORT, function () { return console.info('Server listening on port ', SERVER_PORT); });
