import * as jwtUtils from '../services/jwtUtils'
import { NextFunction, Request, Response } from 'express'

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.header('Authorization')
        let user: User
        let validToken = true
        try {
            user = jwtUtils.decodeToken(token)
        } catch {
            validToken = false
        }

        if (!token || !validToken) {
            res.status(401).send({
                message: "Unauthorized"
            })
            return
        }

        req.body.user = user
        next()
    } catch (err) {
        res.status(500).send()
    }
}

export { authenticate }