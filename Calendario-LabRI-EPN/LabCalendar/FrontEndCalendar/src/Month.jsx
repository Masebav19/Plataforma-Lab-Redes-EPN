import { useState, useRef } from "react"
import ShowContent from './showContent.jsx'

const DaysNames =["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
const MounthName = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]

const  ReturnCalendar=({daysPeerMounth,dateInfo,SetDetailSession,SetLogStatus,SessionData,SessionAction}) => {
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
        <div className="daysCalendar-container">
          {
            daysPeerMounth.map(day =>{
              return(
                <>
                  <span
                  className="day-Month-container"
                  key={day.Id}
                  style={day.isToday ? {background: '#0099cc44'}:{}} title={`${day.Date} de ${MounthName[day.Mounth]} del ${day.Year}`}>
                  <div className="nav-conatiner">
                    <span 
                    key={''.concat(day.Id,'-',day.Date)}
                    className='Date-Info'
                    style={dateInfo.Mounth!==day.Mounth ?{opacity:'20%'}:{}}
                    >
                      {day.Date}
                    </span>
                    <nav 
                      key={''.concat(day.Id,'-Nav')}
                      className='Add-Session'
                      onClick={()=>handleLog(day.Id)}
                      hidden={day.Feriado!=="Ninguno" || day.Mounth!==dateInfo.Mounth}>
                      <img 
                      key={''.concat(day.Id,'-img')}
                      src="./public/new_calendar.svg" alt="Nuevo" />
                    </nav>
                    {day.sesionInfo.length>2&&
                    <nav className='show-content'
                    onClick={()=> GetContent(day.Id)}>
                      <img src="./public/signup.svg" alt="" />
                    </nav>}
                  </div>
                  {day.Feriado!== "Ninguno"&& <small 
                    key={''.concat(day.Id,'-Holiday')}
                    className='Feriado'>
                      {day.Feriado}
                    </small>}
                  {day.sesionInfo&&day.Feriado==="Ninguno" && day.sesionInfo.map(element => {
                    return(
                    <small 
                    id={''.concat(`${element.Year}-${element.Month}-${element.Date}`,'-',element.Id)}
                    key={''.concat(`${element.Year}-${element.Month}-${element.Date}`,'-',element.Id)}
                    className='Session'
                    onClick={() => handleSessionInfo(element.Id)}
                    style={element.Periodicidad === 'Diariamente' ? {color: '#f7e8ca',fontStyle: 'italic'}:
                    element.Periodicidad === 'Semanalmente' ? {color: '#fff',fontStyle: 'italic'}:{}}>
                      {element.Asunto}
                    </small>
                  )})}
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

export default ReturnCalendar