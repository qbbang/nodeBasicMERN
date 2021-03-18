

// Require Dependencies
import env from "mandatoryenv"
import express from "express"
import { applyMiddleware } from './middleware/index';

// Load .env Enviroment Variables to process.env
env.load([
    'DB_URL',
    'SERVER_PORT',
    'SECRET'
]);
const { SERVER_PORT } = process.env;
const app = express();

// 환경변수 로딩 후 import 해줘야하는 것들..
import commonHandler from './middleware/common.handler';
import errorHandler from './middleware/error.handler';

applyMiddleware(commonHandler, app);
applyMiddleware(errorHandler, app);


// Open Server on configurated Port
app.listen(
    SERVER_PORT,
    () => console.info('Server listening on port ', SERVER_PORT)
);