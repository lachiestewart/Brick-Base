import { Express } from "express"
import * as User from '../controllers/user.controller'
import { rootUrl } from "./base.routes"

module.exports = (app: Express) => {
    app.route(rootUrl + '/users')
        .get(User.getAllUsers)

    app.route(rootUrl + '/users/register')
        .post(User.register)

    app.route(rootUrl + '/user')
        .get(User.getUserByEmail)

    app.route(rootUrl + '/users/login')
        .post(User.login)

}