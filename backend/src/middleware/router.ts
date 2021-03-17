import express from "express";
import webhookRouter from "@service/webhook/router";

const router = express.Router();

router.use('/v1/webhook', webhookRouter);

export default router;