"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var morgan_1 = __importDefault(require("morgan"));
var logger_1 = __importDefault(require("../util/logger"));
var logHandler = function (router) {
    // Configure custom logger middleware
    router.use(logger_1.default.dev, logger_1.default.combined);
    router.use(morgan_1.default('dev'));
};
exports.default = [logHandler];
