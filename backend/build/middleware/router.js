"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("../service/webhook/router"));
var router = express_1.default.Router();
/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
    return res.send('OK');
});
router.use('/v1/webhook', router_1.default);
exports.default = router;
