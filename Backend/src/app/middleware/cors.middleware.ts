import {Request, Response} from "express"

export default (req: Request, res: Response, next: () => void) => {
    // process.env.CLIENT_URL || 'http://localhost:3000'
    res.header('Access-Control-Allow-Origin',  '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    next()
}