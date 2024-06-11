import {Express} from "express"
import * as bricklink from '../controllers/bricklink.controller'

module.exports = (app: Express) => {
    app.route('/set/:setNumber')
        .get(bricklink.getSet)
}