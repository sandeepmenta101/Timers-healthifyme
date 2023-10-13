import { useState, useRef } from "react";

export default function Timer({ id, deleteTimer }) {
  const [timer, setTimer] = useState(0);
  const timerId = useRef(null);
  const minutes = Math.floor(timer / 10);
  const seconds = timer % 10;
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [laps, setLaps] = useState([]);

  const handleStartTimer = () => {
    setIsTimerStarted(true);
    timerId.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const handleResetTimer = () => {
    setIsTimerStarted(false);
    clearInterval(timerId.current);
    setTimer(0);
  };

  const handlePauseTimer = () => {
    setIsTimerStarted(false);
    clearInterval(timerId.current);
  };

  const storeTheLap = () => {
    if (isTimerStarted) {
      setLaps((prevState) => [...prevState, `${minutes} M: ${seconds}s`]);
    }
  };

  return (
    <div className="timer">
      <section>
        <div className="timer-section">
          <h1>
            {minutes} M: {seconds}s
          </h1>
          <button onClick={() => deleteTimer(id)}>Delete Timer</button>
        </div>
        <div>
          <button onClick={handleStartTimer}>{`${
            isTimerStarted ? "Resume" : "Start"
          } Timer`}</button>
          <button onClick={handleResetTimer}>Stop Timer</button>
          <button onClick={handlePauseTimer}>Pause Timer</button>
          {isTimerStarted && (
            <button onClick={storeTheLap}>Lap the Time</button>
          )}
        </div>
      </section>
      {laps?.length > 0 && (
        <section>
          <h2>Lap Timings</h2>
          <ul>
            {laps.map((lap, i) => (
              <li key={i}>{lap}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
