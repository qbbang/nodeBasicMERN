"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var compression_1 = __importDefault(require("compression"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
var swaggerUi = require('swagger-ui-express');
var router_1 = __importDefault(require("./router"));
var swagger = __importStar(require("./swagger"));
var handleBasic = function (router) {
    router.use(cookie_parser_1.default());
    router.use(cors_1.default());
    router.use(helmet_1.default());
    router.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', '..', 'public')));
    router.use('/api', router_1.default);
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger.swaggerSpec));
};
var handleBodyRequestParsing = function (router) {
    // Configure Express App Instance
    router.use(express_1.default.json({ limit: '50mb' }));
    router.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
};
var handleCompression = function (router) {
    router.use(compression_1.default());
};
var responseHeader = function (router) {
    router.use('*', function (req, res, next) {
        res.sendFile(path_1.default.join(__dirname, '..', '..', '..', 'public/index.html'), function (err) {
            if (err) {
                res.status(500).send(err);
            }
        });
    });
};
exports.default = [handleBasic, handleBodyRequestParsing, handleCompression, responseHeader];
