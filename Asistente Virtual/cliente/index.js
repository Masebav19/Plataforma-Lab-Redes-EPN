
import { mcpCommands } from "./mcp/mcp.js"
import dotenv from "dotenv"
import MCPClient from "./Client/MCPClient.js"

dotenv.config({ quiet: true})


const MCPCOMMANDS = await mcpCommands()



process.stdin.setEncoding('utf8')
process.stdin.on('data',async (chunk)=>{
    try{
        const msg = JSON.parse(chunk)
        try{
            if(msg.type === "prompt"){
                const response = await mcpClient.processQuery({ query: msg.content, sessionId: msg.sessionId})
                process.stdout.write(JSON.stringify(response).concat('\n'))
            }
        }catch(e){
            throw e
        }finally{
            await mcpClient.CleanUp()
            process.exit(0)
        }
        
    }catch(e){
        throw e
    }
})

const mcpClient = new MCPClient()
async function main(){
    try{
        if(MCPCOMMANDS.length > 0){
            for(const command of MCPCOMMANDS){
                await mcpClient.connectToServer(command.mcpPath)
            }
        }
    }catch(e){
        console.log({error: e})
        mcpClient.CleanUp()
        process.exit(0)
    }
}

await main()