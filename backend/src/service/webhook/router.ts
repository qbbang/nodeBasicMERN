import express from "express";
import controll from "./controller"
import validation from "./validation"

const router = express.Router();

router.route('/read').get(validation.query, controll.getWebhook);
router.route('/read/:id').post(validation.webhookId, controll.getWebhookById);
router.route('/write').get(validation.WebhookArray, controll.writeWebhook);
router.route('/delete').delete(validation.query, controll.deleteWebhook);
router.route('/delete/:id').delete(validation.webhookId, controll.deleteWebhookById);

export default router;