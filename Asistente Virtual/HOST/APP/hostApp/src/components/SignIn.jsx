import { useRef } from "react";
import "./SignIn.css"
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import FecthRequest from "../utils/request";

export default function SignIn({SetUser}){
    const email = useRef(null)
    async function handleSignIn(e){
        e.preventDefault()
        const mail = email.current.value
        if(mail){
            const URI = "http://localhost:4004/getusers"
            const users = await FecthRequest({ URI })
            const filter = users.find(user => user.email === mail)
            if(!filter){
                const URI = "http://localhost:4004/createuser"
                const method = "POST"
                const body = JSON.stringify({ mail })
                const response = await FecthRequest({ URI, method, body })
                SetUser(response) 
            }else{
                SetUser(filter)
            }
        }
    }
    return(
        <>
            <main id="SigInContainer">
                <div id="HeaderSigInContainer">
                    <SmartToyOutlinedIcon fontSize="medium"/>
                    <h5>Laboratorio de redes industriales</h5>
                </div>
                <h2>Asistente virtual</h2>
                <input type="email" id="emailInput" placeholder="email" ref={email}/>
                <button id="EnterButton" onClick={handleSignIn}>Enter</button>
                <div>
                    <br />
                    <small>Si no ingresas con tu correo, puedes solo dar click en enter, en este caso las conversaciones no se guardan y se eliminan al cerrar el navegador</small>
                </div>
            </main>
        </>
    )
}