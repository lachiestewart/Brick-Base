import * as db from '../../config/db'
// import { ObjectId } from 'mongodb';


const userCollection = process.env.USER_COLLECTION

const register = async (user: User) => {
    const collection = db.getDatabase().collection(userCollection)
    collection.insertOne(user)
}

const getUserByEmail = async (email: string): Promise<User> => {
    const collection = db.getDatabase().collection(userCollection)
    return await collection.findOne({ email }) as unknown as User
}

const listUsers = async (): Promise<User[]> => {
    const collection = db.getDatabase().collection(userCollection)
    return await collection.find().toArray() as unknown as User[]
}

export { register, listUsers, getUserByEmail }