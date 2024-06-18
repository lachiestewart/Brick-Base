import * as db from '../../config/db'
import * as defaultUsers from "../resources/default_users.json"
import * as passwordService from '../services/passwords'

const userCollection = process.env.USER_COLLECTION

const validateItemType = (item: any): item is BricklinkItemRequest => {
    return typeof item.type === 'string' && ["MINIFIG", "PART", "SET", "BOOK", "GEAR", "CATALOG", "INSTRUCTION", "UNSORTED_LOT", "ORIGINAL_BOX"].includes(item.type);
}

const parseUser = async (user: any): Promise<User> => {

    const password = await passwordService.hash(user.password)

    return {
        ...user,
        password: password,
        items: user.items ? user.items.filter(validateItemType) : []
    }
}

const getDefaultUsers = async (): Promise<User[]> => {
    const hashedDefaultUsers: User[] = await Promise.all(defaultUsers.usersData.map(parseUser))
    return hashedDefaultUsers
}

const clearUsers = async () => {
    try {

        const collection = db.getDatabase().collection(userCollection)
        await collection.deleteMany({})
    } catch (error) {
        console.log('Could not clear database' + error)
    }
}

const resetUsers = async () => {
    try {
        const collection = db.getDatabase().collection(userCollection)
        await collection.deleteMany({})
        const parsedDefaultUsers = await getDefaultUsers()
        await collection.insertMany(parsedDefaultUsers)
    } catch (error) {
        console.log('Could not reset database' + error)
    }
}

export { clearUsers, resetUsers }