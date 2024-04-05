import { useState } from 'react'
import './index.css';

function BreakSelector({breakLen}) {

  return (
    <div id="BreakSelector" className='selectors'>
      <div id="break-label">Break Length</div>
      <span id="break-length">{breakLen}</span>
      <button id="break-increment">up</button>
      <button id="break-decrement">down</button>
    </div>
  )
}

function SessionSelector({sessionLen, setSessionLen}) {

  function sessionHandleClick(e) {
    switch("e.target.id"){
      case "session-increment":
        setSessionLen(sessionLen + 1)
        break;
      case "session-decrement":
        setSessionLen(sessionLen - 1)
        break;
      default:
        break;
    }
    
  }

  return (
    <div id="SessionSelector" className='selectors'>
      <div id="session-label">session Length</div>
      <span id="session-length">{sessionLen}</span>
      <button id="session-increment" onClick={sessionHandleClick()}>up</button>
      <button id="session-decrement" onClick={sessionHandleClick()}>down</button>
    </div>
  )
}

function MainDisplay({sessionLen, breakLen}) {

  return (
    <div id="mainDisplay">
      <div id="timer-label">Session</div>
      <div id="time-left">00:00</div>
      <button id="start_stop">Start/Stop</button>
      <button id="reset">reset</button>
    </div>
  );
}

function App() {
  const [sessionLen, setSessionLen] = useState(25);
  const [breakLen, setBreakLen] = useState(5);
  
  

  return (
    <div className="App">
      <header>productivity clock</header>
      <SessionSelector sessionLen={sessionLen} setSessionLen={setSessionLen}/>
      <BreakSelector breakLen={breakLen}/>
      <MainDisplay sessionLen={sessionLen} breakLen={breakLen} />
    </div>
  );
}

export default App;
