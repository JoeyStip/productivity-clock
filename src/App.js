import { useState } from 'react'
import './index.css';
import { useEffect } from 'react'

function BreakSelector({breakLen, setBreakLen}) {

  function breakHandleClick(e) {
    switch(e.target.id){
      case "break-increment":
        if(breakLen<60){
          setBreakLen(breakLen + 1)
        }
        break;
      case "break-decrement":
        if(breakLen>0){
          setBreakLen(breakLen - 1)
        }
        break;
      default:
        break;
    }
  }

  return (
    <div id="BreakSelector" className='selectors'>
      <div id="break-label">Break Length</div>
      <span id="break-length">{breakLen}</span>
      <button id="break-increment" onClick={breakHandleClick}>up</button>
      <button id="break-decrement" onClick={breakHandleClick}>down</button>
    </div>
  )
}

function SessionSelector({sessionLen, setSessionLen}) {

  function sessionHandleClick(e) {
    switch(e.target.id){
      case "session-increment":
        if(sessionLen<60){
          setSessionLen(sessionLen + 1)
        }
        break;
      case "session-decrement":
        if(sessionLen>0){
          setSessionLen(sessionLen - 1)
        }
        break;
      default:
        break;
    }
  }

  return (
    <div id="SessionSelector" className='selectors'>
      <div id="session-label">session Length</div>
      <span id="session-length">{sessionLen}</span>
      <button id="session-increment" onClick={sessionHandleClick}>up</button>
      <button id="session-decrement" onClick={sessionHandleClick}>down</button>
    </div>
  )
}

function MainDisplay({sessionLen, breakLen, countdown, setCountdown}) {
  
  let paused = true

  useEffect(()=>{
    setInterval(()=> {
      if(!paused){setCountdown((count) => count-1)}
    }, 1000)
  })

  const playPause = () => {
    paused = !paused
  };

  return (
    <div id="mainDisplay">
      <div id="timer-label">Session</div>
      <div id="time-left">{
        Math.floor(countdown/60).toString().padStart(2,0) + ":" + (countdown%60).toString().padStart(2,0)
      }</div>
      <button id="start_stop" onClick={playPause}>Start/Stop</button>
      <button id="reset">reset</button>
    </div>
  );
}

function App() {
  const [sessionLen, setSessionLen] = useState(25);
  const [breakLen, setBreakLen] = useState(5);
  const [countdown, setCountdown] = useState(250)

  return (
    <div className="App">
      <header>productivity clock</header>
      <SessionSelector sessionLen={sessionLen} setSessionLen={setSessionLen}/>
      <BreakSelector breakLen={breakLen} setBreakLen={setBreakLen}/>
      <MainDisplay sessionLen={sessionLen} breakLen={breakLen} countdown={countdown} setCountdown={setCountdown}/>
    </div>
  );
}

export default App;
