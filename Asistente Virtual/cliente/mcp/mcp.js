import fs from 'node:fs/promises'

export const mcpCommands = async ()=>{
    return JSON.parse(await fs.readFile('C:/Users/9014463D1707/Documents/Proyectos Lab/Asistente Virtual/cliente/mcp/mcp.json', {encoding: 'utf-8'}))
}