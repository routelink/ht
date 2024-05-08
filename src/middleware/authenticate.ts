import passport from 'passport';
import * as jwt from "jsonwebtoken";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from '@hackatone/models';
import { error } from './error';
import { config } from '@hackatone/config';
import { AUTH } from '@hackatone/enums';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
      passReqToCallback: true
    },
    async (req: any, payload: any, done: any) => {
      
      try {
        const user = await User.findOne({ where: { email: payload.email } });

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export function authenticate(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, status: any) => {

    if (status instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ status: AUTH.EXPIRED_ACCESS_TOKEN, message: 'Access Token Expired' });
    }
    if (err) {
      return error(err, req, res, next);
    }

    if (!user) {
      return res.status(401).json({ status: AUTH.REQUIRED, message: 'Authentication required' });
    }

    req.user = user;
    next();
  })(req, res, next);
}