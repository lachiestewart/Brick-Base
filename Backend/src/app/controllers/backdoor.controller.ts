import { Request, Response } from 'express'
import * as backdoor from '../models/backdoor.model'

const clear = async (req: Request, res: Response) => {
    try {
        await backdoor.clearUsers()
        res.status(200).send()
    } catch (error) {
        console.log(error)
    }
}

const reset = async (req: Request, res: Response) => {
    try {
        await backdoor.resetUsers()
        res.status(200).send()
    } catch (error) {
        console.log(error)
    }

}

export { clear, reset }