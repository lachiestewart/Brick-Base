import { Request, Response } from "express"

const clientURL = process.env.CLIENT_URL

export default (req: Request, res: Response, next: () => void) => {
    res.header('Access-Control-Allow-Origin', clientURL || '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    next()
}