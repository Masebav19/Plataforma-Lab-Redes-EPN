import { useState } from "react"
import SignIn from "./components/SignIn.jsx"
import Chat from "./components/Chat.jsx"
function App() {
  const [User, SetUser] = useState(null)

  return (
    <>
      { !User &&
        <SignIn 
        SetUser= {SetUser}
        />
      }
      { User &&
        <Chat
        User={User}
        />
      }
    </>
  )
}

export default App
