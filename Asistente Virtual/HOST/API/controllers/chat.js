import { spawn } from "child_process"
import dotenv from "dotenv"

dotenv.config()

function chatClient({ chatinfo }, callback){
    let ResponseMessage = ""
    const client = spawn("node",[process.env.CLIENMCPPATH],{
        stdio: ['pipe', 'pipe', 'inherit'],
    })

    client.stdout.setEncoding("utf8")
    client.stdout.on('data',(data) =>{
        const messages = data.toString();
        ResponseMessage += messages
    
    })
    client.on('close', ()=>{
        const responseMsg = JSON.parse(ResponseMessage)
        if(responseMsg.error)
            callback(responseMsg,null)
        else
            callback(null,responseMsg)
    })
    const sendPrompt = (text) => {
        client.stdin.write(JSON.stringify(text) + "\n");
    }
    sendPrompt(chatinfo)
}

export default function chatClientPromise(chatinfo){
    return new Promise((res,rej)=>{
        chatClient({ chatinfo },(error,response)=>{
            if(error) rej(error)
            else res(response)
        })
    })
}

