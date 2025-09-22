from mcp.server.fastmcp import FastMCP
from Scripts.client import get_state
import json

mcp = FastMCP('Siemens_Client')

@mcp.tool()
async def get_plc_state(IP: str) -> str:
    """Get the diagnostic state of a Siemens PLC
        Args:
            IP: IP Adress of the PLC(e.g. 192.168.10.10)
    """
    data = await get_state(IP)
    return json.dumps(data)

if __name__ == "__main__":
    mcp.run(transport="stdio")
