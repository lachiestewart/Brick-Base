import { Express } from "express"
import * as backdoor from '../controllers/backdoor.controller'
import { rootUrl } from "./base.routes"

module.exports = (app: Express) => {
    app.route(rootUrl + '/reset')
        .post(backdoor.reset)

    app.route(rootUrl + '/clear')
        .post(backdoor.clear)
}
