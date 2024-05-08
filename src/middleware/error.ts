import { ErrorResponse } from "@hackatone/interfaces";
import { Request, Response, NextFunction } from "express";

export function error(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    let message: ErrorResponse = {
        message: err.message,
    }
    if ('development' === process.env.NODE_ENV) {
        message = { ...message, stack: err.stack }
    }
    res.json(message);
}
