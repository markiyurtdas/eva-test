import { Request, Response, NextFunction } from 'express';

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isUnauthenticated()) {
    res.status(404).send({
      status: 'error',
      message: 'You have no access.',
    })
  }
  next();
}
