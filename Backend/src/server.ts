import express from './config/express'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

async function main() {
    app.listen(port, async () => {
        console.log('Listening on port: ' + port)
    })
}

main()
