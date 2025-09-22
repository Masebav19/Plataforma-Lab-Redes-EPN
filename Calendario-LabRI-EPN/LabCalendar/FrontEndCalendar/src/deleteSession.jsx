
function DeleteSession({LogUser,SetLogStatus,SetLogUser,SetDetailSession,SessionInfo}){
    function handleReturn(){
        SetLogStatus(false)
        SetDetailSession({})
        SetLogUser({})
    }
    function handleDeleteSession(e){
        e.preventDefault()
        if(LogUser.Type.localeCompare("Estudiante-Técnico")===0 ||LogUser.Type.localeCompare("Estudiante-Docente")===0 ){
            alert("Solo puede borrar la sessión un docente o un técnico docente")
            SetLogStatus(false)
            SetDetailSession({})
            SetLogUser({})
        }
        const {Asunto,Correo_responsable}=SessionInfo
        if(LogUser.User.localeCompare(Correo_responsable)===0){
            requestDeleteSession({Asunto,Correo_responsable}).then(session => {
                if(session.error) {
                    alert(session.error[0].message)
                    SetLogStatus(false)
                    SetDetailSession({})
                    SetLogUser({})
                }else{
                    alert(`Session Borrada:
                        Asunto: ${session.Asunto}
                        Fecha: ${session.Year}-${session.Month}-${session.Date}
                        Anfitrio: ${session.Responsable}`)
                        SetLogStatus(false)
                        SetDetailSession({})
                        SetLogUser({})
                }
                
            })
        }else{
            alert("Solo puede borrar la sessión el usuario que creó la sesión")
            SetLogStatus(false)
            SetDetailSession({})
            SetLogUser({})
        }
        
    }
    async function requestDeleteSession(object){
        const result = fetch("http://172.31.33.28:4001/time/deleSession",{
            method: 'DELETE',
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
                    <h3>
                        ¿Estas seguro de borrar la Sesión?
                    </h3>
                    
                </header>

                <div className="form-container">
                    <form onSubmit={handleDeleteSession}>
                        <fieldset>
                            <legend>Ingresar sesion</legend>
                            <div className="button-container">
                            <button type="submit">
                                <img src="../public/delete.svg" alt="login" />
                                <small>
                                    Delete
                                </small>
                            </button>
                            <button type="button" onClick={handleReturn}>
                                <img src="../public/close.svg" alt="login" />
                                <small>
                                    Return
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

export default DeleteSession