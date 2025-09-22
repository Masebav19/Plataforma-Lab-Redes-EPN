import snap7
import json

async def get_state(IP:str) -> dict:
    plc = snap7.client.Client()
    plc.connect(IP)
    state = plc.get_cpu_state()
    info = plc.get_cpu_info()
    S7Info = {
        "state": state,
        "info": info
    }
    return S7Info