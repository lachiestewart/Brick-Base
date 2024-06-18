import { Request, Response } from "express"
import * as userModel from '../models/user.model'
import * as passwordService from '../services/passwords'
import * as schemas from '../resources/schemas.json'
import * as jwt from '../services/jwtUtils'
import { validate } from '../services/validator'

const register = async (req: Request, res: Response) => {
    try {
        const user: User = req.body
        const validation = await validate(
            schemas.user_register,
            user
        )
        if (validation !== true) {
            res.status(400).send({
                message: validation
            })
            return
        }
        if (await userModel.getUserByEmail(user.email)) {
            res.status(400).send({
                message: 'Email already in use'
            })
            return
        }
        if (!passwordService.test(user.password, [user.firstName, user.lastName, user.email])) {
            res.status(400).send({
                message: 'Password too weak'
            })
            return
        }
        user.password = await passwordService.hash(user.password)
        await userModel.register(user)
        res.status(201).send(user._id)
    } catch {
        res.status(500).send()
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.listUsers()
        users.forEach(user => user.password = undefined)
        res.status(200).send(users)
    } catch {
        res.status(500).send()
    }
}

const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string
        const user = await userModel.getUserByEmail(email)
        if (user) {
            user.password = undefined
            res.status(200).send(user)
        } else {
            res.status(404).send({
                message: 'User not found'
            })
        }
    } catch {
        res.status(500).send()
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const user: User = req.body
        const validation = await validate(
            schemas.user_login,
            user
        )

        if (validation !== true) {
            res.status(400).send({
                message: validation
            })
            return
        }

        const dbUser = await userModel.getUserByEmail(user.email)
        if (!dbUser) {
            res.status(404).send({
                message: 'User not found'
            })
            return
        }

        if (!await passwordService.compare(user.password, dbUser.password)) {
            res.status(401).send({
                message: 'Incorrect password'
            })
            return
        }
        dbUser.password = undefined
        res.status(200).setHeader('Authorization', jwt.generateToken(dbUser)).send()
    } catch {
        res.status(500).send()
    }

}

export { register, getAllUsers, getUserByEmail, login }