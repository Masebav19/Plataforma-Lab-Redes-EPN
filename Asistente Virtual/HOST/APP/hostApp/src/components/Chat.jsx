import "./Chat.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from "react"
import FecthRequest from "../utils/request.js"
import Message from "./message.jsx";
import CircularProgress from '@mui/material/CircularProgress';

export default function Chat({ User }){
    const [messages, SetMessages] = useState([])
    const prompt = useRef(null)
    const chatRef = useRef(null)
    const [sendingState, SetSendingState] = useState(false)
    useEffect(()=>{
        const URI = `http://localhost:4004/getChat?sessionId=${User.sessionId}`
        FecthRequest({ URI }).then(data =>{
            SetMessages(data.messages)
        })
    },[])

    useEffect(() => {
        // Autoscroll al final cuando cambian los mensajes
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages,sendingState]);

    async function handlePrompt(e){
        e.preventDefault()
        SetSendingState(true)
        const URI = "http://localhost:4004/client/chat"
        const method = "POST"
        const body = JSON.stringify({ type: 'prompt', sessionId: User.sessionId, content: prompt.current.value})
        prompt.current.value = ""
        const response = await FecthRequest({URI,method,body})
        SetMessages(response.messages)
        SetSendingState(false)
    }
    return(
        <>
            <header>
                <div className="headerSpan">
                    <ArrowBackIosIcon/>
                </div>
                <div className="headerSpan">
                    <span style={{background: `#${Math.floor(Math.random()*16777215).toString(16)}`}}>{`${User.email.split('.')[0].at(0)}${User.email.split('.')[1].at(0)}`}</span>
                    <small>{User.email}</small>
                </div>
            </header>
            <main id="ChatContainer">
                <div className="Chat" ref={chatRef}>
                    {
                        messages.map((message,index)=>{
                            return(
                            <Message 
                                content={message}
                                key={index}
                            />
                            )
                        })
                    }
                    {sendingState&&
                        <CircularProgress/>
                    }
                </div>
                <div className="ChatInputContainer">
                    <input type="text" id="ChatInput" ref={prompt} onKeyUp={e=>{if(e.key==="Enter") handlePrompt(e)}}/>
                    <button onClick={handlePrompt}><SendIcon/></button>
                </div>
            </main>
        </>
    )
}