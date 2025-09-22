
function ShowContent({SetshowContent,content}){
    function handleReturn(){
        SetshowContent(false)
    }

    return(
        <>
            <div className="Major-container">
                <header>
                    <nav onClick={handleReturn}>
                        <img src="../public/close.svg" alt="Close" />
                    </nav>
                    <h3>
                        Sesiones de Laboratorio
                    </h3>
                </header>
                <ul>
                    {
                        content.sesionInfo.map(el =>{
                            return(
                                <>
                                <strong>{el.Asunto}</strong>
                                    <li>
                                        Fecha: {`${el.Year}-${el.Year}-${el.Date}`}
                                    </li>
                                    <li>
                                        Hora inicial: {el.Hora_inicial}
                                    </li>
                                    <li>
                                        Hora final: {el.Hora_final}
                                    </li>
                                    <li>
                                        Repetir: {el.Periodicidad}
                                    </li>
                                    {el.Enlace&& <li>
                                        <a href={`${el.Enlace}`}>Enlace a coferencia</a>
                                    </li>}
                                    <li>Anfitrion: {el.Responsable}</li>
                                    <li>
                                        <a href={`mailto:${el.Correo_responsable}`}>{el.Correo_responsable}</a>
                                    </li>
                                </>
                                    
                            )
                        })
                    }
                </ul>

            </div>
        </>  
    )
}

export default ShowContent