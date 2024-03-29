import { Request, Response } from 'express'

export function root(req: Request, res: Response) {
    res.status(200).send('<h1>TEST</h1>');
}