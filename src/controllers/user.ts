import { NextFunction, Request, Response } from 'express';
import { User } from '@hackatone/models';
import {hash} from 'bcrypt';

export const users = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(new Error("" + error));
    }
}

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, password, email, phone } = req.body;
        const hashedPassword  = await hash(password, 12);
        const user = await User.create({
            name: name,
            password: hashedPassword,
            email: email,
            phone: phone
        });
        res.json(user);
    } catch (error) {
        next(new Error("" + error));
    }
}
