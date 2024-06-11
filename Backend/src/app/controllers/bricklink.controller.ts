import * as bricklink from '../../config/bricklinkApi'
import { Request, Response } from "express"

const getSet = async (req: Request, res: Response): Promise<void> => {
    try {
        const setNumber = req.params.setNumber
        const data = await bricklink.getSet(setNumber)
        res.status(200).send(data)
    } catch {
        res.status(500).send()
    }
}

export { getSet }