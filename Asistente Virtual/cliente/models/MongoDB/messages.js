import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import { v4 } from "uuid"

dotenv.config({ quiet: true })

const MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/"
const DATABASE = process.env.MONGO_DATABASE || "IA_ASSISTANT"
const COLLECTION = process.env.MONGO_COLLECTION_CHAT || "n8n_chat_histories"

export default class MessagesClient {
    constructor(){
        this.client = new MongoClient(MONGODB_URL)
    }
    async getMessages( sessionId = v4() ){
        try{
            await this.client.connect()
            const db = this.client.db(DATABASE)
            const collection = db.collection(COLLECTION)
            return await collection.findOne({ sessionId }) || {}
        }catch(e){
            return { error: "Error fetching messages: ",e }
        }finally{
            await this.client.close()
        }
    }
    async UpdateMessages( sessionId = v4(), msg = {}){
        try{
            await this.client.connect()
            const db = this.client.db(DATABASE)
            const collection = db.collection(COLLECTION)
            await collection.updateOne({ sessionId }, {$push: {messages: msg}})
            return { success: true, sessionId }
        }catch(e){
            return { error: "Error fetching messages" }
        }finally{
            await this.client.close()
        }
        
    }
}