"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import validate from 'express-validation';
var controller_1 = __importDefault(require("./controller"));
// import validation from "./validation"
var router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Webhook APIs
 */
/**
 * @swagger
 * paths:
 *   /api/v1/webhook/read:
 *     get:
 *       summary: 웹훅 조회
 *       tags: [Webhook]
 *       responses:
 *         200:
 *           description: 웹훅 조회 성공
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *               message:
 *                 type: string
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Webhook'
 */
router.route('/read').get(controller_1.default.getWebhook);
/**
 * @swagger
 * paths:
 *   /api/v1/webhook/read/{id}:
 *     get:
 *       summary: 웹훅 단건 조회
 *       tags: [Webhook]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: '사용자 아이디 전달'
 *       responses:
 *         200:
 *           description: 웹훅 조회 성공
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *               message:
 *                 type: string
 *               data:
 *                 $ref: '#/definitions/Webhook'
 */
router.route('/read/:id').get(/*validate(validation.WebhookID),*/ controller_1.default.getWebhookById);
router.route('/write').post(/*validate(validation.WebhookArray),*/ controller_1.default.writeWebhook);
router.route('/write/:id').post(/*validate(validation.WebhookArray),*/ controller_1.default.writeWebhookById);
router.route('/delete').delete(/*validate(validation.WebhookIDArray),*/ controller_1.default.deleteWebhook);
router.route('/delete/:id').delete(/*validate(validation.WebhookID),*/ controller_1.default.deleteWebhookById);
exports.default = router;
