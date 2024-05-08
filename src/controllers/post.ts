import { NextFunction, Request, Response } from 'express';
import { Post, User } from '@hackatone/models';


export const posts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await Post.findAll();
        res.json(users);
    } catch (error) {
        next(new Error("" + error));
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, authorId } = req.body;

        const post = await Post.create({
            title: title,
            description: description,
            authorId: authorId
        });
        res.json(post);
    } catch (error) {
        next(new Error("" + error));
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = req.user as User;

        const post = await Post.findOne({ where: { id: id } });

        if (post!.authorId !== user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const remove = await Post.destroy({ where: { id: id } });
        console.log('remove post:', remove)
        res.json({ message: "post removed" });
    } catch (error) {
        next(new Error("" + error));
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const post = await Post.update(
            {
                title: title,
                description: description,
            },
            { where: { id: id } });
        res.json(post);
    } catch (error) {
        next(new Error("" + error));
    }
}