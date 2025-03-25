import { MongoClient } from "mongodb"
let db;
export async function connectToDatabase(app){
    try{
        const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/estoque'
        const client = new MongoClient(MONGO_URI)
        await client.connect()
        console.log('Connected to MongoDB')
        db = client.db()
        app.locals.db = db
        return db
    }catch (error){
        console.error('Error connecting to the database', error)
        process.exit(1)
    }
}

export{ db }