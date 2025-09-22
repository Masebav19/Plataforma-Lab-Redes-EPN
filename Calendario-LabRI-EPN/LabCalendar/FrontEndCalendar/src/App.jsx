import { useEffect, useState, useRef } from 'react'
import Info from './info.jsx'
import LogPage from './LogPage.jsx'
import CreateSession from './createSession.jsx'
import DeleteSession from './deleteSession.jsx'
import ReturnCalendar from './Month.jsx'
import ReturnWeekCalendar from './Week.jsx'


async function handleRequest(calendarType,ReqType,Data) {
  const RouteType = calendarType === "Month" ? 'Dayspeermounth':calendarType === "week7"?'Dayspeerweek/7':'Dayspeerweek/3'
  if(ReqType === 'GET'){
    const result = await fetch(`http://172.31.33.28:4001/time/${RouteType}`)
    const data = await result.json()
    return data
  }else{
    const result = await fetch(`http://172.31.33.28:4001/time/${RouteType}`,{
      method: ReqType,
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Data)
    })
    const data = await result.json()
    return data
  }
  
}
function App() {
  const [DetailSession, SetDetailSession] = useState({})
  const [daysPeerMounth,SetDayPeerMounth] = useState(undefined)
  const [LogStatus,SetLogStatus] = useState(false)
  const [LogUser,SetLogUser] = useState({})
  const TypeCalendar = useRef('Month')
  const dateInfo = useRef(undefined)
  const SessionData = useRef({})
  const SessionAction = useRef('')

  useEffect(() => {
    handleRequest(TypeCalendar.current,'GET',{}).then(data => {
      SetDayPeerMounth(data.DaysPeerMounth)
      dateInfo.current=data.dateInfo
    })
  },[])
  useEffect(() => {
    handleRequest(TypeCalendar.current,'GET',{}).then(data => {
      SetDayPeerMounth(data.DaysPeerMounth)
      dateInfo.current=data.dateInfo
    })   
  },[LogStatus])
  function HandleBack(){
      const Index = TypeCalendar.current === 'Month' ? (daysPeerMounth.length/2).toFixed(0): 0
      const year = daysPeerMounth[Index].Year
      const mount= daysPeerMounth[Index].Mounth
      const date = daysPeerMounth[Index].Date
      handleRequest(TypeCalendar.current,'POST',{year,mount,date,action:'Back'}).then(data => {
        if(TypeCalendar.current === 'Month') {
          SetDayPeerMounth(data.DaysPeerMounth)
        } else{
          SetDayPeerMounth(data.DaysPeerWeek)
        }
        dateInfo.current=data.dateInfo
      })
  }

  function HandleForward(){
    const Index = TypeCalendar.current === 'Month' ? (daysPeerMounth.length/2).toFixed(0): 0
    const year = daysPeerMounth[Index].Year
    const mount= daysPeerMounth[Index].Mounth
    const date = daysPeerMounth[Index].Date
    handleRequest(TypeCalendar.current,'POST',{year,mount,date,action:'Fordward'}).then(data => {
      if(TypeCalendar.current === 'Month') {
        SetDayPeerMounth(data.DaysPeerMounth)
      } else{
        SetDayPeerMounth(data.DaysPeerWeek)
      }
      dateInfo.current=data.dateInfo
    })
  }

  // async function handleRequest(year,mount,date,action){
  //   const result = await fetch('http://172.31.33.28:4001/time/Dayspeermounth',{
  //     method: 'POST',
  //     headers: {"Content-Type": "application/json",},
  //     body: JSON.stringify({
  //       year: year,
  //       mount: mount,
  //       date: date,
  //       action: action
  //     })
  //   })
  //   const data = await result.json()
  //   return data
  // }
  function handleChangeMonth(){
    if (TypeCalendar.current !== 'Month') {
      TypeCalendar.current = 'Month'
      handleRequest('Month','GET',{}).then(data =>{
        SetDayPeerMounth(data.DaysPeerMounth)
        dateInfo.current=data.dateInfo
      })
    }
  }
  function handleChangeWeek7(){
    if (TypeCalendar.current !== 'week7') {
      TypeCalendar.current = 'week7'
      handleRequest('week7','GET',{}).then(data =>{
        SetDayPeerMounth(data.DaysPeerWeek)
        dateInfo.current=data.dateInfo
      })
    }
  }
  function handleChangeWeek3(){
    if (TypeCalendar.current !== 'week3') {
      TypeCalendar.current = 'week3'
      handleRequest('week3','GET',{}).then(data =>{
        SetDayPeerMounth(data.DaysPeerWeek)
        dateInfo.current=data.dateInfo
      })
    }
  }
  return (
    <>
      <span className='Calendar-container'>
        <section className='Nav-calendar-type'>
          <nav className='calendar-type-option' onClick={handleChangeMonth}>
            <img src="./public/calendar.svg" alt="Mes" />
            <span>Mes</span>
          </nav>
          <nav className='calendar-type-option' onClick={handleChangeWeek7}>
            <img src="./public/week.svg" alt="7 Días" />
            <span>7 Días</span>
          </nav>

          <nav className='calendar-type-option' onClick={handleChangeWeek3}>
            <img src="./public/little_week.svg" alt="3 días" />
            <span>3 Días</span>
          </nav>
        </section>
          <section className='Return-date' onClick={HandleBack}>
            <img src="./public/arrow_back.svg" alt="Back" />
          </section>
          {daysPeerMounth && TypeCalendar.current === 'Month' && <ReturnCalendar 
          daysPeerMounth ={daysPeerMounth}
          dateInfo = {dateInfo.current}
          SetDetailSession = {SetDetailSession}
          SetLogStatus= {SetLogStatus}
          SessionData={SessionData}
          SessionAction={SessionAction}
          />}
          {daysPeerMounth && TypeCalendar.current === 'week7' && <ReturnWeekCalendar 
          daysPeerMounth ={daysPeerMounth}
          dateInfo = {dateInfo.current}
          SetDetailSession = {SetDetailSession}
          SetLogStatus= {SetLogStatus}
          SessionData={SessionData}
          SessionAction={SessionAction}
          />}
          <section className='Next-Date'onClick={HandleForward}>
            <img src="./public/arrow_forward.svg" alt="Forward" />
          </section>
          
        </span>
        <section
          className='Session-Info'
          key={''.concat(DetailSession.Id,'-','Details')}>
            {DetailSession.Year && <Info
            SessionInfo = {DetailSession}
            SetDetailSession = {SetDetailSession}
            SessionAction={SessionAction}
            SetLogStatus= {SetLogStatus}
            />}
        </section> 
        {LogStatus && !(LogUser.User) ? 
          <LogPage
          SetLogUser= {SetLogUser}
          SetLogStatus={SetLogStatus}
          /> : (LogStatus && LogUser.User && SessionAction.current === 'Create') ? <CreateSession
          LogUser= {LogUser}
          SetLogStatus={SetLogStatus}
          SetLogUser= {SetLogUser}
          SessionData={SessionData}
          />: (LogStatus && LogUser.User && SessionAction.current === 'Delete') && <DeleteSession
          LogUser= {LogUser}
          SetLogStatus={SetLogStatus}
          SetLogUser= {SetLogUser}
          SetDetailSession={SetDetailSession}
          SessionInfo = {DetailSession}
          />}  
    </>
  )
}

export default App
