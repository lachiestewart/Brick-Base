import { Express } from "express"
import * as backdoor from '../controllers/backdoor.controller'

module.exports = (app: Express) => {
    app.route('/reset')
        .post(backdoor.reset)

    app.route('/clear')
        .post(backdoor.clear)
}
