import { Request, Response } from 'express'
import * as backdoorModel from '../models/backdoor.model'

const clear = async (req: Request, res: Response) => {
    try {
        await backdoorModel.clearUsers()
        res.status(200).send()
    } catch (error) {
        console.log(error)
    }
}

const reset = async (req: Request, res: Response) => {
    try {
        await backdoorModel.resetUsers()
        res.status(200).send()
    } catch (error) {
        console.log(error)
    }

}

export { clear, reset }