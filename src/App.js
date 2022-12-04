import React from 'react';
import './style.css';
import Start from './components/Start'
import Game from './components/Game'

function App() {
  const [start, setStart] = React.useState(true)
  
  function startHandler(){
    //console.log('BTN Geht');
    setStart(false)
  }

  return (
    <div className="App">
     {start && <Start handleClick={startHandler}/>}
     {!start && <Game />}

      
    </div>
  );
}

export default App;
