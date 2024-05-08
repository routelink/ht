import { Options } from 'sequelize';

export type SameSite = 'strict' | 'lax' | 'none';

export interface Cookie {
  name: string,
  enabled: boolean,
  sameSite: SameSite;
  path: string;
  domain: string | null;
  httpOnly: boolean;
  secure: boolean;
  removeTokenFromBody: boolean;
}

export interface IConfig {
  db: Options
  jwtSecret: string,
  accessTokenExpiresIn: string,
  refreshTokenExpiresIn: string,
  cookie: Cookie;
  [key: string]: any
}

export const config: IConfig = {
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
  accessTokenExpiresIn: process.env.JWT_ACCESSTOKEN_TTL || '4h',
  refreshTokenExpiresIn: process.env.JWT_REFRESHTOKEN_TTL || '7d',
  db: {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT) || 5432,
    database: process.env.DBNAME || 'hackatone',
    username: process.env.DBUSER || 'hackatone',
    password: process.env.DBPASSWORD || 'hackatone',
    dialect: 'postgres'
  },
  cookie: {
    name: 'refresh_token',
    enabled: true,
    sameSite: 'lax',
    path: '/auth',
    domain: null,
    httpOnly: 'production' === process.env.NODE_ENV,
    secure: 'production' === process.env.NODE_ENV,
    removeTokenFromBody: true
  }
};