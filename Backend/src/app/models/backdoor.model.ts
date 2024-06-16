import * as db from '../../config/db'
import * as defaultUsers from "../resources/default_users.json"
import * as passwords from '../services/passwords'

const userCollection = process.env.USER_COLLECTION

const hashUser = async (user: User) => {
    user.password = await passwords.hash(user.password)
    return user
}

const clearUsers = async () => {
    const collection = db.getDatabase().collection(userCollection)
    await collection.deleteMany({})
}

const resetUsers = async () => {
    try {
        const collection = db.getDatabase().collection(userCollection)
        await collection.deleteMany({})
        const hashedDefaultUsers = await Promise.all(defaultUsers.usersData.map(hashUser))
        await collection.insertMany(hashedDefaultUsers)
    } catch (error) {
        console.log('Could not reset database' + error)
    }
}

export { clearUsers, resetUsers }