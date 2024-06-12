import * as db from '../../config/db'
import * as defaultUsers from "../resources/default_users.json"

const userCollection = process.env.USER_COLLECTION

const clearUsers = async () => {
    const collection = db.getDatabase().collection(userCollection)
    await collection.deleteMany({})
}

const resetUsers = async () => {
    try {
        const collection = db.getDatabase().collection(userCollection)
        await collection.deleteMany({})
        await collection.insertMany(defaultUsers.usersData)
    } catch (error) {
        console.log('Could not reset database' + error)
    }
}

export { clearUsers, resetUsers }