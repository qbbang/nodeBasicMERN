import express from "express";
// import validate from 'express-validation';
import controll from "./controller"
// import validation from "./validation"

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Webhook APIs
 */

/**
 * @swagger
 * paths:
 *   /kstm/api/v1/webhook/read:
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
router.route('/read').get(controll.getWebhook);

/**
 * @swagger
 * paths:
 *   /kstm/api/v1/webhook/read/{id}:
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
router.route('/read/:id').get(/*validate(validation.WebhookID),*/ controll.getWebhookById);

router.route('/write').post(/*validate(validation.WebhookArray),*/ controll.writeWebhook);

router.route('/write/:id').post(/*validate(validation.WebhookArray),*/ controll.writeWebhookById);

router.route('/delete').delete(/*validate(validation.WebhookIDArray),*/ controll.deleteWebhook);

router.route('/delete/:id').delete(/*validate(validation.WebhookID),*/ controll.deleteWebhookById);

export default router;