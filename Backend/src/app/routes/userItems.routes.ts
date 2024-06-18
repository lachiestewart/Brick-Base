import { Express } from "express"
import * as UserItems from '../controllers/userItems.controller'
import { rootUrl } from "./base.routes"
import { authenticate } from '../middleware/jwt.middleware'

module.exports = (app: Express) => {

    app.route(rootUrl + '/items')
        .post(authenticate, UserItems.addItem)
        .get(authenticate, UserItems.getAllItemsForUser)
        .delete(authenticate, UserItems.removeItem)

}