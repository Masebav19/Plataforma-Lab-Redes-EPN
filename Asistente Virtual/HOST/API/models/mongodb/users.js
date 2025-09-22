import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import { v4 } from "uuid"
dotenv.config()

export default class Users{
    constructor(){
        this.mongoClient = new MongoClient(process.env.MONGODB_URI)
    }
    async getAll(){
        try{
            await this.mongoClient.connect()
            const db = this.mongoClient.db(process.env.MONGO_DATABASE)
            const collection = db.collection(process.env.MONGO_COLLECTION)
            const response =  await collection.find().toArray();
            return response
        }catch{
           return { error : "Can't fetch data"} 
        }
        
    }
    async GetChat({ sessionId }){
        await this.mongoClient.connect()
        const db = this.mongoClient.db(process.env.MONGO_DATABASE)
        const collection = db.collection(process.env.MONGO_COLLECTION_CHAT)
        return await collection.findOne({ sessionId })
    }
    async create({mail}){
        try{
            let users = await this.getAll()
            const filter = users.find(user => user.email === mail)
            if(filter) return {error: "There's a user with that email"}
            await this.mongoClient.connect()
            const db = this.mongoClient.db(process.env.MONGO_DATABASE)
            const collection = db.collection(process.env.MONGO_COLLECTION)
            const collectionChat = db.collection(process.env.MONGO_COLLECTION_CHAT)
            const sessionId = v4()
            collection.insertOne({ sessionId , email: mail})
            collectionChat.insertOne({ sessionId, messages: [] })
            return await collection.findOne({ email: mail })
        }catch{
            return {error: "Can't insert data"}
        }
    }
    async delete({mail}){
        try{
            await this.mongoClient.connect()
            const db = this.mongoClient.db(process.env.MONGO_DATABASE)
            const collection = db.collection(process.env.MONGO_COLLECTION)
            const collectionChat = db.collection(process.env.MONGO_COLLECTION_CHAT)
            const session = await collection.findOne({ email: mail })
            await collectionChat.deleteOne({ sessionId: session.sessionId })
            return await collection.deleteOne({ email: mail })

        }catch{
            return { error: "Can't delete data"}
        }
    }
}