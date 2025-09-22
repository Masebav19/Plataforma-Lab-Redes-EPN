
function CreateSession({LogUser,SetLogStatus,SetLogUser,SessionData}){
    if(LogUser.Type.localeCompare("Estudiante-Técnico")===0 ||LogUser.Type.localeCompare("Estudiante-Docente")===0 ){
        alert("Solo puede borrar la sessión un docente o un técnico docente")
        SetLogStatus(false)
        SetLogUser({})
    }
    function handleReturn(){
        SetLogStatus(false)
        SetLogUser({})
    }
    function handleCreateSession(e){
        e.preventDefault()
        if(LogUser.Type.localeCompare("Estudiante-Técnico")===0 ||LogUser.Type.localeCompare("Estudiante-Docente")===0 ){
            alert("Solo puede borrar la sessión un docente o un técnico docente")
            SetLogStatus(false)
            SetLogUser({})
        }
        const forms = e.target
        const Form = new FormData(forms)
        const {Asunto,H_inicial,Minuto_inicial,H_final,Minuto_final,
            Periodicidad,Enlace,Responsable,Correo_responsable,invitados
        }= Object.fromEntries(Form.entries())
        const Hora_inicial = H_inicial.concat(':',Minuto_inicial.padStart(2,'0'))
        const Hora_final = H_final.concat(':',Minuto_final.padStart(2,'0'))
        const {Year, Month, Date} = {Year: SessionData.current.Year,Month: SessionData.current.Mounth,Date:SessionData.current.Date}
        const correos_invitados = invitados ? invitados:"Ninguno"
        requestCreateSession({Year,Month,Date,Asunto,Hora_inicial,Hora_final,Periodicidad,Enlace,
            Responsable,Correo_responsable,correos_invitados}).then(session => {
                if(session.error) {
                    alert(session.error[0].message)
                    SetLogStatus(false)
                    SetLogUser({})
                }else{
                    alert(`Session creada:
                        Asunto: ${session.Asunto}
                        Fecha: ${session.Year}-${session.Month}-${session.Date}
                        Anfitrio: ${session.Responsable}`)
                        SetLogStatus(false)
                        SetLogUser({})
                        SessionData.current = {}
                }
                
            })
    }
    async function requestCreateSession(object){
        const result = fetch("http://172.31.33.28:4001/time//NewSession",{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...object})
        })
        const SesionData = (await result).json()
        return SesionData
    }
    return(
        <>
            <div className="Major-container">
                <header>
                    <nav onClick={handleReturn}>
                        <img src="../public/close.svg" alt="Close" />
                    </nav>
                    <h3>
                        Ingrese los datos necesarios para registar la nueva sesion
                    </h3>
                    
                </header>

                <div className="form-container">
                    <form onSubmit={handleCreateSession}>
                        <fieldset>
                            <legend>Detalles de la sesion</legend>
                            <div className="input-contaner">
                                <input type="text" name="Asunto" required placeholder="Lab Ejemplo" 
                                    title="Colocal al asunto de la sesión"/>
                                <label htmlFor="Asunto">Asunto</label>
                            </div>
                            <div className="time-container">
                                <div className="input-contaner">
                                    <fieldset>
                                        <legend>Hora Inicial</legend>
                                        <input list="ListType_HI" required name="H_inicial" placeholder="Hora"/>
                                        <datalist id= "ListType_HI">
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>                                     
                                            <option value="22">22</option>                                     
                                        </datalist>
                                        <input list="ListType_MI" required name="Minuto_inicial" placeholder="Minuto"/>
                                        <datalist id= "ListType_MI">
                                            <option value="0">0</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>                                    
                                        </datalist>
                                    </fieldset>
                                
                                </div>
                                <div className="input-contaner">
                                    <fieldset>
                                        <legend>Hora Final</legend>
                                        <input list="ListType_HF" required name="H_final" placeholder="Hora"/>
                                        <datalist id= "ListType_HF">
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>                                     
                                            <option value="22">22</option>                                     
                                        </datalist>

                                        <input list="ListType_MF" required name="Minuto_final" placeholder="Minuto"/>
                                        <datalist id= "ListType_MF">
                                            <option value="0">0</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>                                    
                                        </datalist>
                                    </fieldset>
                                    
                                </div>
                            </div>

                            <div className="input-contaner">
                                <input list="ListType" required name="Periodicidad" placeholder="Repetir"/>
                                <datalist id= "ListType">
                                    <option value="Ninguno">Ninguno</option>
                                    <option value="Diariamente">Diariamente</option>
                                    <option value="Semanalmente">Semanalmente</option>
                                    <option value="Mensualmente">Mensualmente</option>
                                    <option value="Anualmente">Anualmente</option>
                                </datalist>
                                <label htmlFor="Periodicidad">Repetir</label>
                            </div>

                            <div className="input-contaner">
                                <input type="url" name="Enlace" placeholder="Link de video Conferencia" 
                                    title="Colocar el link de la reunion si la tiene"/>
                                <label htmlFor="Enlace">Link de video Conferencia</label>
                            </div>

                            <div className="input-contaner">
                                <input type="text" name="Responsable" required placeholder="Nombre del anfitrion" 
                                    title="Colocar nombre del anfitrion"/>
                                <label htmlFor="Responsable">Nombre del anfitrion</label>
                            </div>

                            <div className="input-contaner">
                                <input type="email" name="Correo_responsable" required placeholder="Correo del anfitrion" 
                                    title="Colocar el correo institucional del anfitrion"/>
                                <label htmlFor="Correo_responsable">Correo del anfitrion</label>
                            </div>

                            <div className="input-contaner">
                                <input type="text" name="invitados"  placeholder="Invitados" 
                                    title="Colocar los correos de los invitados separados por punto y coma"/>
                                <label htmlFor="invitados">Invitados</label>
                            </div>
                            
                        </fieldset>
                        <fieldset>
                            <legend>Ingresar sesion</legend>
                            <div className="button-container">
                            <button type="submit">
                                <img src="../public/login.svg" alt="login" />
                                <small>
                                    Create
                                </small>
                            </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateSession