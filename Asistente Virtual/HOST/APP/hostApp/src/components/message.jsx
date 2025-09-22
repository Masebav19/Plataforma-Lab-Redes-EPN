import "./message.css"


export default function Message({ content}){
    return(
        <>
            <div className={`messageContainer ${content.role}`}>
                <span>
                    {content.content.split('\n').map((text,index) =>{
                        return (
                            <span key={index}>{text}</span>
                        )
                    })}
                   
                </span>
            </div>
        </>
    )
}