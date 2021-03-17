import express from "express";
import webhookRouter from "../service/webhook/router";

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/v1/webhook', webhookRouter);

export default router