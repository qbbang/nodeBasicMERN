import express from "express";
// import validate from 'express-validation';
import controll from "./controller"
// import validation from "./validation"

const router = express.Router();

router.route('/read').get(controll.getWebhook);
router.route('/read/:id').get(/*validate(validation.WebhookID),*/ controll.getWebhookById);
router.route('/write').post(/*validate(validation.WebhookArray),*/ controll.writeWebhook);
router.route('/write/:id').post(/*validate(validation.WebhookArray),*/ controll.writeWebhookById);
router.route('/delete').delete(/*validate(validation.WebhookIDArray),*/ controll.deleteWebhook);
router.route('/delete/:id').delete(/*validate(validation.WebhookID),*/ controll.deleteWebhookById);

export default router;