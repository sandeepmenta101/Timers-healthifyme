import { useState } from "react";

import './App.css';
import Timer from "./Timer";

function App() {
  const [timersList, setTimersList] = useState([]);

  const addTimer = () => {
    const newTimer = { id: timersList.length + 1 };
    setTimersList((prevState) => [...prevState, newTimer]);
  };

  const deleteTimer = (id) => {
    const newTimers = timersList.filter((timer) => timer.id !== id);
    setTimersList(newTimers);
  };

  return (
    <div className="App">
      <button onClick={addTimer}>Add Timer</button>
      {timersList.map((timer) => (
        <Timer {...timer} deleteTimer={deleteTimer} key={timer.id} />
      ))}
    </div>
  );
}

export default App;
