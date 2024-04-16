import { useState } from 'react'
import './index.css';
import { useEffect } from 'react'
import sound from './Christmas Sound Effects I Free Download - doorbell.wav'
import BGvid from "./videoplayback.webm"

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
    <div id="BreakSelector" className='selectors blob'>
      <div id="break-label">Break Length</div>
      <span id="break-length">{breakLen}</span>
      <button className='arrow' id="break-increment" onClick={breakHandleClick}>&#8679;</button>
      <button className='arrow' id="break-decrement" onClick={breakHandleClick}>&#8681;</button>
    </div>
  )
}

function SessionSelector({sessionLen, setSessionLen, setCountdown}) {

  function sessionHandleClick(e) {
    switch(e.target.id){
      case "session-increment":
        if(sessionLen<60){
          setSessionLen(sessionLen + 1)
          setCountdown((sessionLen+1)*60)
        }
        break;
      case "session-decrement":
        if(sessionLen>1){
          setSessionLen(sessionLen - 1)
          setCountdown((sessionLen-1)*60)
        }
        break;
      default:
        break;
    }
  }

  return (
    <div id="SessionSelector" className='selectors blob'>
      <div id="session-label">Session Length</div>
      <span id="session-length">{sessionLen}</span>
      <button className='arrow' id="session-increment" onClick={sessionHandleClick}>&#8679;</button>
      <button className='arrow' id="session-decrement" onClick={sessionHandleClick}>&#8681;</button>
    </div>
  )
}

let paused = true

function MainDisplay({setSessionLen, sessionLen, setBreakLen, breakLen, countdown, setCountdown, setSessionOrBreak, sessionOrBreak}) {
  
  useEffect(()=>{
    const interval = setInterval(()=> {
      if(!paused){
        setCountdown((count) => count-1)
        if(countdown===0){
          if(sessionOrBreak==="Session"){
            document.getElementById("beep").play()
            setCountdown(breakLen*60)
            setSessionOrBreak("Break")
          } else {
            document.getElementById("beep").play()
            setCountdown(sessionLen*60)
            setSessionOrBreak("Session")
          }
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [setCountdown, countdown, breakLen, sessionLen, sessionOrBreak, setSessionOrBreak]);

  const playPause = () => {
    paused = !paused
  };
  
  const reset = () => {
    document.getElementById("beep").load(0)
    setSessionLen(25)
    setBreakLen(5)
    setCountdown(25*60)
    setSessionOrBreak("Session")
    paused = true
  }

  return (
    <div id="mainDisplay" className='blob'>
      <audio id="beep" src={sound} type="audio/mpeg"></audio>
      <div id="timer-label">{sessionOrBreak}</div>
      <div id="time-left">{
        Math.floor(countdown/60).toString().padStart(2,0) + ":" + (countdown%60).toString().padStart(2,0)
      }</div>
      <button className="main" id="start_stop" onClick={playPause}>Start/Stop</button>
      <button className="main" id="reset" onClick={reset}>reset</button>
      <span className="tag">By Joey Stipich</span>
      <span className="tag credits">Background visuals by Chokchai Love King from "Amazing Nature"</span>
    </div>
  );
}

function App() {
  const [sessionLen, setSessionLen] = useState(25);
  const [breakLen, setBreakLen] = useState(5);
  const [countdown, setCountdown] = useState(25*60)
  const [sessionOrBreak, setSessionOrBreak] = useState("Session")

  return (
    <div className="App">
      <video loop autoPlay muted>
        <source src={BGvid} type="video/webm"></source>
      </video>
      <header className='blob'>25 + 5 Clock</header>
      <SessionSelector sessionLen={sessionLen} setSessionLen={setSessionLen} setCountdown={setCountdown}/>
      <BreakSelector breakLen={breakLen} setBreakLen={setBreakLen}/>
      <MainDisplay sessionLen={sessionLen} setSessionLen={setSessionLen} breakLen={breakLen} setBreakLen={setBreakLen} countdown={countdown} setCountdown={setCountdown} setSessionOrBreak={setSessionOrBreak} sessionOrBreak={sessionOrBreak}/>
    </div>
  );
}

export default App;
