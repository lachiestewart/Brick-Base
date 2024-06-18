import * as db from '../../config/db'

const userCollection = process.env.USER_COLLECTION

const addItem = async (email: string, bricklinkItem: BricklinkItemRequest) => {
    const collection = db.getDatabase().collection(userCollection)
    const findOneFilter = { email }
    const user: User = await collection.findOne(findOneFilter) as unknown as User
    const newItems = user.items ? [...user.items, bricklinkItem] : [bricklinkItem]
    const updateDoc = { $set: { items: newItems } }
    await collection.updateOne(findOneFilter, updateDoc)
}

const removeItem = async (email: string, bricklinkItem: BricklinkItemRequest) => {
    const collection = db.getDatabase().collection(userCollection)
    const findOneFilter = { email }
    const user: User = await collection.findOne(findOneFilter) as unknown as User
    const newItems = user.items.filter(item => !(item.no === bricklinkItem.no && item.type === bricklinkItem.type))
    const updateDoc = { $set: { items: newItems } }
    await collection.updateOne(findOneFilter, updateDoc)
}

export { addItem, removeItem }