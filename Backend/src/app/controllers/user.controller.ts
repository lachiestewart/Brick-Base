import { Request, Response } from "express"
import * as User from '../models/user.model'
import * as passwords from '../services/passwords'
import * as schemas from '../resources/schemas.json'
import { validate } from '../services/validator'

const register = async (req: Request, res: Response) => {
    try {
        const user: User = req.body
        const validation = await validate(
            schemas.user_register,
            user
        )
        if (validation !== true) {
            res.statusMessage = validation
            res.status(400).send()
            return
        }
        if (await User.getUserByEmail(user.email)) {
            res.statusMessage = 'Email already in use'
            res.status(400).send()
            return
        }
        if (!passwords.test(user.password, [user.firstName, user.lastName, user.email])) {
            res.statusMessage = 'Password too weak'
            res.status(400).send()
            return
        }
        user.password = await passwords.hash(user.password)
        await User.register(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.listUsers()
        res.status(200).send(users)
    } catch {
        res.status(500).send()
    }
}

export { register, getAllUsers }