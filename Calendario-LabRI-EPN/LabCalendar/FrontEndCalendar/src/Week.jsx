import { useState, useRef } from "react"
import ShowContent from './showContent.jsx'

const DaysNames =["Hora","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
const MounthName = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
const times = length => Array.from({length},(_,i)=>i)

const  ReturnWeekCalendar=({daysPeerMounth,dateInfo,SetDetailSession,SetLogStatus,SessionData,SessionAction}) => {
    const[showContent,SetshowContent]=useState(false)
    const content = useRef({})
    function GetContent(Id){
      const NewContent = daysPeerMounth.find(element => element.Id === Id)
      content.current = NewContent
      SetshowContent(true)
    }
    function  handleSessionInfo(Id){
        const Session = daysPeerMounth.find(element => element.sesionInfo.find(info => info.Id === Id))
        const Info = Session.sesionInfo.find(info => info.Id === Id)
        SetDetailSession(Info)     
    }
  
    function handleLog(Id){
      const {Year, Mounth, Date, sesionInfo}= daysPeerMounth.find(element => element.Id === Id)
      SessionData.current = {Year, Mounth, Date, sesionInfo}
      SessionAction.current = 'Create'
      SetLogStatus(true)
    }
    return(
      <>
      <nav className='Calendar'>
        <div className="DayNames-container">
            <div className="info-Calendar">
              <header>{''.concat(MounthName[dateInfo.Mounth],' de ',dateInfo.Year)}</header>
              </div>
              
            <div className="info-Calendar">
            {
                DaysNames.map(dayName =>{
                  return(
                    <span
                    key={dayName}>
                      {dayName}
                    </span>
                  )
                })
              }
            </div>
        </div>
        <div className="weekCalendar-container">
            <span className="day-week-container">
                {
                    times(16).map(i =>{
                        return times(4).map(k=>{
                            return(
                                <div className="nav-conatiner week">
                                    <span 
                                    className='Date-Info'>
                                        <small>
                                            {`${7+i}:${(15*k).toString().padStart(2,'0')}`}
                                        </small>
                                    </span>
                                </div>
                                

                            )
                        })
                    })
                }  
            </span>
          {
            daysPeerMounth.map(day =>{
              return(
                <>
                  <span
                    className="day-week-container"
                    key={day.Id}
                    style={day.isToday ? {background: '#0099cc44'}:{}} title={`${day.Date} de ${MounthName[day.Mounth]} del ${day.Year}`}>
                    {
                        times(16).map(i=>{
                            return times(4).map(k =>{
                                return(
                                    <div className="nav-conatiner week"
                                    style={ day.sesionInfo.find(session => 
                                        ((i+7+k/4) >= (Number(session.Hora_inicial.split(':')[0]))+Number(session.Hora_inicial.split(':')[1])/15)&&
                                        ((i+7+k/4) <= (Number(session.Hora_final.split(':')[0]))+Number(session.Hora_final.split(':')[1])/15)
                                    ) ? {background: "#0099cc"}:{}}
                                    >
                                        {
                                            day.sesionInfo.find(session => session.Hora_inicial === `${i+7}:${(15*k).toString().padStart(2,'0')}`) && 
                                            <small>
                                                {day.sesionInfo.find(session => session.Hora_inicial === `${i+7}:${(15*k).toString().padStart(2,'0')}`).Asunto}
                                            </small>
                                        }
                                    </div>
                                )
                            })
                        })
                    }
                  </span>
                </> 
              )
            })
          }
        </div>
      </nav>
      {showContent && <ShowContent
      SetshowContent= {SetshowContent}
      content = {content.current}
      />}
      </>
      
    )
}

export default ReturnWeekCalendar