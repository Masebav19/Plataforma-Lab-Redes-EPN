import { Ollama } from "ollama"
import MessagesClient from "../models/MongoDB/messages.js"
import { Client } from "@modelcontextprotocol/sdk/client"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"

const IA_MODEL = process.env.CLIENT_IA || "deepseek-r1:7b"

export default class MCPClient {
    constructor(){
        this.model = new Ollama({ host: "http://127.0.0.1:11434"});
        this.mcp = new Client({ name: "mpc-client-cli", version: "1.0.0"});
    }
    async connectToServer(serverScriptPath= ""){
        try{
            const isPy = serverScriptPath.endsWith(".py")
            const command = isPy? "python":process.execPath
            this.transport = new StdioClientTransport({
                command,
                args: [serverScriptPath],
            })
            
            await this.mcp.connect(this.transport)
            
            const toolsResult = await this.mcp.listTools()
            this.tools = toolsResult.tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.inputSchema,
                }
            })

        }catch(e){
            throw e;
        }
        
    }

    async processQuery ({query = "", sessionId }){
        if (!sessionId) return { error: "Session ID is required" }
        const clientMongo = new MessagesClient()
        const messages = await clientMongo.getMessages(sessionId)
        messages.messages.push({role: "user", content: query})
        await clientMongo.UpdateMessages(sessionId, messages.messages[messages.messages.length -1])
        const response = await this.model.chat({
            model: IA_MODEL,
            messages: messages.messages,
            tools: this.tools,
            think: false
        })
        if(response.message.tool_calls){
            for (const tool of response.message.tool_calls){
                const toolName = tool.function.name
                const toolArgs = tool.function.arguments
                const result = await this.mcp.callTool(toolName, toolArgs)
                messages.messages.push({role: "user", content: result.content})
                const response = await this.model.chat({
                    model: IA_MODEL,
                    messages:messages.messages,
                    think: false
                })
                messages.messages.push({
                    role: "assistant",
                    content: response.message.content

                })
                await clientMongo.UpdateMessages(sessionId, messages.messages[messages.messages.length -1])
            }
        }else{
            messages.messages.push({
                role: "assistant",
                content: response.message.content,  
            })
            await clientMongo.UpdateMessages(sessionId, messages.messages[messages.messages.length -1]) 
        }
       return messages 
    }
    async CleanUp(){
        await this.mcp.close()
    }
}