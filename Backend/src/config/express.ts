import express from "express"
import bodyParser from "body-parser"
import allowCrossOriginRequestsMiddleware from "../app/middleware/cors.middleware"


export default () => {
    const app = express()

    // Middleware
    app.use(allowCrossOriginRequestsMiddleware)
    app.use(bodyParser.json())
    app.use(bodyParser.raw({ type: 'text/plain' }))
    app.use(bodyParser.raw({ type: ['image/*'], limit: '5mb' }))

    // Debug
    app.use((req, res, next) => {
        console.log(`##### ${req.method} ${req.path} #####`)
        next()
    })

    app.get("/", (req, res) => {
        res.status(200).send("Hello World!");
    })

    // ROUTES
    require('../app/routes/bricklink.routes')(app)
    require('../app/routes/user.routes')(app)
    require('../app/routes/backdoor.routes')(app)
    require('../app/routes/userItems.routes')(app)

    return app
}