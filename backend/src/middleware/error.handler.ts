import { Request, Response, NextFunction, Router } from 'express';

abstract class HTTPClientError extends Error {
    readonly statusCode!: number;
    readonly name!: string;
  
    constructor(message: object | string) {
      if (message instanceof Object) {
        super(JSON.stringify(message));
      } else {
        super(message);
      }
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
}
  
class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;
  
    constructor(message: string | object = 'Bad Request') {
        super(message);
    }
}
  
class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;
  
    constructor(message: string | object = 'Not found') {
        super(message);
    }
}
  
const notFoundError = () => {
    throw new HTTP404Error('Method not found.');
};

const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
};

const serverError = (err: Error, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    notFoundError();
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    clientError(err, res, next);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
