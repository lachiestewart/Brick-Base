import * as bricklink from '../../config/bricklinkApi'
import { Request, Response } from "express"

const getSet = async (req: Request, res: Response): Promise<void> => {
    try {
        const setNumber = req.params.setNumber
        const itemRequest: BricklinkItemRequest = {
            no: setNumber,
            type: 'SET'
        }
        const data = await bricklink.getItem(itemRequest)
        res.status(200).send(data)
    } catch {
        res.status(500).send()
    }
}

export { getSet }