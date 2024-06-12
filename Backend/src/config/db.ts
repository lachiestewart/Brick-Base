import * as mongoDB from 'mongodb'

const state: {
    database: mongoDB.Db | null
} = {
    database: null
}

const mongoHost = process.env.MONGO_HOST
const mongoAppName = process.env.MONGO_APP_NAME
const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD

const url = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoHost}/?retryWrites=true&w=majority&appName=${mongoAppName}`

const mongoDBName = process.env.MONGO_DB_NAME

const connect = async () => {
    const client = new mongoDB.MongoClient(url)
    await client.connect()
    const dbName = mongoDBName;
    state.database = client.db(dbName);
}

const getDatabase = () => state.database


export { connect, getDatabase }