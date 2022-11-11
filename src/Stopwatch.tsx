import * as React from "react";
import Controller from "./Controller";
import UseStopwatch from "./Hooks/useStopwatch";
import Laps from "./Laps";
import Time from "./Time";

const Stopwatch: React.FC = () => {
  const {
    seconds,
    status,
    nextLap,
    laps,
    start,
    stop,
    reset,
    record
  } = UseStopwatch();

  return (
    <div>
      <Time seconds={seconds} />
      <Controller
        status={status}
        start={start}
        stop={stop}
        reset={reset}
        record={record}
      />
      <Laps laps={laps} nextLap={nextLap} status={status} />
    </div>
  );
};

export default Stopwatch;
