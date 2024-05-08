import { NextFunction, Request, Response } from 'express';
import { config } from '@hackatone/config';
import { RefreshToken, User } from '@hackatone/models';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH } from '@hackatone/enums';
import crypto from 'crypto';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ status: AUTH.INVALID_ACCESS_TOKEN, message: "Invalid username or password" });
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        return generateTokens(res, user);
    } catch (error) {
        next(new Error("" + error));
    }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies[config.cookie.name];
    if (!refreshToken) {
        return res.status(401).json({ status: AUTH.NOT_FOUND_REFRESH_TOKEN, message: 'Not found refresh token' });
    }
    const refreshTokenEntry = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!refreshTokenEntry) {
        if ('deleted' !== refreshToken) {
            res.cookie('refresh_token', 'deleted', {
                httpOnly: config.cookie.httpOnly,
                secure: config.cookie.secure,
                sameSite: config.cookie.sameSite,
                path: config.cookie.path
            });
        }
        return res.status(401).json({ status: AUTH.INVALID_REFRESH_TOKEN, message: 'Invalid refresh token' });
    }
    const user = await User.findOne({ where: { id: refreshTokenEntry.userId } });

    if (!user) {
        console.log("Unable to user: ", refreshTokenEntry.userId);
        res.cookie('refresh_token', 'deleted', {
            httpOnly: config.cookie.httpOnly,
            secure: config.cookie.secure,
            sameSite: config.cookie.sameSite,
            path: config.cookie.path
        });
        return res.status(401).json({ status: AUTH.INVALID_REFRESH_TOKEN, message: 'Invalid refresh token' });
    }

    try {
        const currentTime = new Date().getTime();
        const tokenValidUntil = new Date(refreshTokenEntry.valid).getTime();
        if (currentTime > tokenValidUntil) {
            await refreshTokenEntry.destroy();
            res.clearCookie('refresh_token');
            return res.status(401).json({ status: AUTH.EXPIRED_REFRESH_TOKEN, message: 'Expired Refresh Token' });
        }

        await refreshTokenEntry.destroy();

        return generateTokens(res, user);
    } catch (error) {
        next(new Error("" + error));
        res.status(401).json({ status: AUTH.REFRESH_ERROR, message: 'Error refresh token' });
    }
}

async function generateTokens(res: Response, user: User) {

    const token = jwt.sign({ email: user.email }, config.jwtSecret, {
        expiresIn: config.accessTokenExpiresIn,
    });

    const expires = RefreshToken.generateExpiryDate();
    const refreshToken = crypto.randomBytes(64).toString('hex');

    await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        valid: expires,
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        path: config.cookie.path,
        expires: expires
    });

    res.json({ token });
}   