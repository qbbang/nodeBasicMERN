import express from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import morgan from "morgan"
import cookieParser from "cookie-parser"
import helmet from "helmet"


import appRouter from "./router"
import logger from "../util/logger"

const handleBasic = (router: express.Router) => {
    // Configure custom logger middleware
    router.use(logger.dev, logger.combined);

    router.use(morgan('dev'));
    router.use(cookieParser());
    router.use(cors());
    router.use(helmet());

    router.use('/api', appRouter);
}

const handleBodyRequestParsing = (router: express.Router) => {
    // Configure Express App Instance
    router.use(express.json( { limit: '50mb' } ));
    router.use(express.urlencoded( { extended: true, limit: '10mb' } ));
};

const handleCompression = (router: express.Router) => {
    router.use(compression());
};

const responseHeader = (router: express.Router) => {
    router.use('*', (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    });
}

export default [handleBasic, handleBodyRequestParsing, handleCompression, responseHeader];
