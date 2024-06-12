import { Express } from "express"
import * as User from '../controllers/user.controller'

module.exports = (app: Express) => {
    app.route('/users')
        .get(User.getAllUsers)

    app.route('/users/register')
        .post(User.register)
}