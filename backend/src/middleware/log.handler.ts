
import express from 'express';
import morgan from "morgan";

import logger from "../util/logger";


const logHandler = (router: express.Router) => {
    // Configure custom logger middleware
    router.use(logger.dev, logger.combined);

    router.use(morgan('dev'));
};

export default [logHandler];