import express from 'express'
import chatClientPromise from './controllers/chat.js'
import cors from "cors"
import Users from './models/mongodb/users.js'
import { ValitionUser } from './Schema/user.js'
const server = express()

server.use(express.json())
server.use(cors())

server.post('/client/chat', async(req, res) =>{
    const chatinfo = req.body
    const response = await chatClientPromise(chatinfo)
    res.json(response)
})

server.get('/getusers', async (req,res)=>{
    const users = new Users()
    res.json(await users.getAll())
})

server.get('/getChat',async(req,res)=>{
    const { sessionId } = req.query
    const users = new Users()
    const Chats = await users.GetChat({ sessionId })
    if(Chats) res.json(Chats)
    else res.json({ error: "No Chats found" })

})

server.post('/createuser',async (req,res)=>{
    const users = new Users()
    const result = ValitionUser(req.body)
    if (result.error){
        if(req.body.mail === "default"){
            const user = req.body.mail
            const response = await users.create({ mail: user }) 
            res.json(response) 
        }else{
            return res.json({error: JSON.parse(result.error.message)[0].message}).status(405)
        }
    } 
    const { mail } = result.data
    
    const response = await users.create({mail})
    res.json(response)
})

server.delete('/deleteuser', async (req,res)=>{
    const { mail } = req.body
    const users = new Users()
    const response = await users.delete({ mail })
    res.json(response)
})

server.listen(process.env.PORT || 4004, ()=>{
    console.log(`Server running on por ${process.env.PORT || 4004}`)
})