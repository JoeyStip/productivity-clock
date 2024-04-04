import './index.css';

function mainDisplay() {

  return (
    <div>
      <div id="timer-label">test</div>
      <div id="time-left"></div>
    </div>
  )

}


function App() {
  return (
    <div className="App">
      <header>productivity clock</header>
      <mainDisplay/>
    </div>
  );
}

export default App;
