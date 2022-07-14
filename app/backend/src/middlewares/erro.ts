import { Errback as Err, Request as Req, Response as Res, NextFunction as Next } from 'express';

export default (err: Err, _req: Req, res: Res, _next: Next) => {
  console.log(err);
  return res.status(500).json(err);
};
