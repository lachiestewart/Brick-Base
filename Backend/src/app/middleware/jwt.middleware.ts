import * as jwtUtils from '../services/jwtUtils'
import { NextFunction, Request, Response } from 'express'

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header('Authorization')
        const user = jwtUtils.decodeToken(token)
        req.body.user = user
        next()
    } catch (err) {
        res.status(500).send()
    }
}

export { authenticate }