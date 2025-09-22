import { useState } from 'react'
import LogIn from './LogIn.jsx'
import Panel from './panel.jsx'

function App() {
  const [Log,SetLog]= useState("NoLog")

  function handleHome(){
    window.location.replace("http://172.31.36.30:5000")
  }
  return (
    <>
      <div className="Major-container">
        {Log === "NoLog" &&<LogIn 
        SetLog = {SetLog}
        />}
        {Log === "Login" && <Panel
        SetLog = {SetLog}
        />}        
      </div>
      <div className="return-home container" onClick={handleHome}>
          <img src="./public/home.svg" alt="Home" />
          <span>Home</span>
      </div>
    </>
  )
}

export default App
