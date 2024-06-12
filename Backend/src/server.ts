import express from './config/express'
import 'dotenv/config'
import * as db from './config/db'

const app = express()
const port = process.env.PORT || 3000

const main = async () => {
    try {
        await db.connect()
        app.listen(port, () => {
            console.log('Listening on port: ' + port)
        })
    } catch {
        console.log('Error connecting to database')
    }
}

main()
