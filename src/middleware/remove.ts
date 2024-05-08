import passport from 'passport';
import * as jwt from "jsonwebtoken";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from '@hackatone/models';
import { error } from './error';
import { config } from '@hackatone/config';
import { AUTH } from '@hackatone/enums';

export function remove(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, status: any) => {

    console.log(user, status);

    /**if (status instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ status: AUTH.EXPIRED_ACCESS_TOKEN, message: 'Access Token Expired' });
    }
    if (err) {
      return error(err, req, res, next);
    }

    if (!user) {
      return res.status(401).json({ status: AUTH.REQUIRED, message: 'Authentication required' });
    }

    req.user = user;*/
    next();
  })(req, res, next);
}