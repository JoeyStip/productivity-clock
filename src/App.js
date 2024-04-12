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
        if(breakLen>1){
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
        if(sessionLen>1){
          setSessionLen(sessionLen - 1)
        }
        break;
      default:
        break;
    }
  }

  return (
    <div id="SessionSelector" className='selectors'>
      <div id="session-label">Session Length</div>
      <span id="session-length">{sessionLen}</span>
      <button id="session-increment" onClick={sessionHandleClick}>up</button>
      <button id="session-decrement" onClick={sessionHandleClick}>down</button>
    </div>
  )
}

let paused = true

function MainDisplay({setSessionLen, sessionLen, setBreakLen, breakLen, countdown, setCountdown, workOrBreak, setworkOrBreak}) {
  
  useEffect(()=>{
    const interval = setInterval(()=> {
      if(!paused){
        if(countdown===0){
          if(workOrBreak==="W"){
            setCountdown(breakLen*60)
            setworkOrBreak("B")
          } else {
            setCountdown(sessionLen*60)
            setworkOrBreak("W")
          }
        }
        setCountdown((count) => count-1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [setCountdown, countdown, breakLen, sessionLen, workOrBreak, setworkOrBreak]);

  const playPause = () => {
    paused = !paused
  };
  
  const reset = () => {
    setSessionLen(25)
    setBreakLen(5)
    setCountdown(25*60)
    paused = true
  }

  return (
    <div id="mainDisplay">
      <div id="timer-label">Session</div>
      <div id="time-left">{
        Math.floor(countdown/60).toString().padStart(2,0) + ":" + (countdown%60).toString().padStart(2,0)
      }</div>
      <button id="start_stop" onClick={playPause}>Start/Stop</button>
      <button id="reset" onClick={reset}>reset</button>
    </div>
  );
}

function App() {
  const [sessionLen, setSessionLen] = useState(25);
  const [breakLen, setBreakLen] = useState(5);
  const [countdown, setCountdown] = useState(25*60)
  const [workOrBreak, setworkOrBreak] = useState("W")

  return (
    <div className="App">
      <header>productivity clock</header>
      <SessionSelector sessionLen={sessionLen} setSessionLen={setSessionLen}/>
      <BreakSelector breakLen={breakLen} setBreakLen={setBreakLen}/>
      <MainDisplay sessionLen={sessionLen} setSessionLen={setSessionLen} breakLen={breakLen} setBreakLen={setBreakLen} countdown={countdown} setCountdown={setCountdown} workOrBreak={workOrBreak} setworkOrBreak={setworkOrBreak}/>
    </div>
  );
}

export default App;
