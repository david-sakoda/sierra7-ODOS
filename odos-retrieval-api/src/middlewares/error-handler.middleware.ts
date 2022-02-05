import { Request, Response, NextFunction } from 'express';
import { HTTPError } from './../models/HTTPError';

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(
  err: TypeError | HTTPError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof HTTPError)) {
    customError = new HTTPError(
      'An unspecified error has occurred.'
    );
  }

  res.status((customError as HTTPError).status).send(customError);
};

export default handleError;