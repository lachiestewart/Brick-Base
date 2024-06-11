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

    // ROUTES
    require('../app/routes/bricklink.routes')(app)

    return app
}