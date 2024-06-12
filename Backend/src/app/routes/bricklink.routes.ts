import { Express } from "express"
import * as bricklink from '../controllers/bricklink.controller'
import { rootUrl } from "./base.routes"

module.exports = (app: Express) => {
    app.route(rootUrl + '/set/:setNumber')
        .get(bricklink.getSet)
}