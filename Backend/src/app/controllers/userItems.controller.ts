import { Request, Response } from "express"
import * as userItemsModel from '../models/userItems.model'
import * as userModel from '../models/user.model'

const getAllItemsForUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.getUserByEmail(req.body.user.email)
        if (!user) {
            res.status(404).send({
                message: "User not found"
            })
            return
        }
        res.status(200).send(user.items)
    } catch {
        res.status(500).send()
    }
}

const addItem = async (req: Request, res: Response) => {
    try {
        // need to validate item type
        await userItemsModel.addItem(req.body.user.email, {
            no: req.body.no,
            type: req.body.type as itemType
        })
        res.status(201).send({
            message: "Item added"
        })
    } catch {
        res.status(500).send()
    }
}

// Possibly should change to return updated items list, same for addItem
const removeItem = async (req: Request, res: Response) => {
    try {
        await userItemsModel.removeItem(req.body.user.email, req.body)
        res.status(200).send({
            message: "Item removed"
        })
    } catch {
        res.status(500).send()
    }
}

export { addItem, getAllItemsForUser, removeItem }