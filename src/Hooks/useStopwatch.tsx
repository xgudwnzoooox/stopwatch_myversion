import * as React from "react";

export enum STATUS {
  PROCESSING,
  STOP
}

export interface Lap {
  id: number;
  title: string;
  lapTime: number;
  seconds: number;
}

interface UseStopwatchReturnType {
  seconds: number;
  status: STATUS;
  nextLap: Lap;
  laps: Lap[];

  start: () => void;
  stop: () => void;
  reset: () => void;
  record: () => void;
}

const UseStopwatch: () => UseStopwatchReturnType = () => {
  const [seconds, setSeconds] = React.useState(0);
  const [status, setStatus] = React.useState<STATUS>(STATUS.STOP);
  const [laps, setLaps] = React.useState<Lap[]>([]);

  const nextLap = React.useMemo<Lap>(() => {
    return {
      id: laps.length + 1,
      title: `랩 ${laps.length + 1}`,
      lapTime: seconds - laps[0]?.seconds ?? 0,
      seconds
    };
  }, [seconds, laps]);

  const start = React.useCallback(() => {
    if (status !== STATUS.STOP) {
      return;
    }
    setStatus(STATUS.PROCESSING);
  }, [status]);

  const stop = React.useCallback(() => {
    if (status !== STATUS.PROCESSING) {
      return;
    }
    setStatus(STATUS.STOP);
  }, [status]);

  const reset = React.useCallback(() => {
    if (status === STATUS.PROCESSING) {
      return;
    }

    setSeconds(0);
    setLaps([]);
  }, [status]);

  const record = React.useCallback(() => {
    if (status === STATUS.STOP) {
      return;
    }
    setLaps((prev) => [nextLap, ...prev]);
  }, [status, nextLap]);

  React.useEffect(() => {
    let intervalId: number;

    if (status === STATUS.PROCESSING) {
      intervalId = window.setInterval(() => {
        setSeconds((prev) => {
          return prev + 0.01;
        });
      }, 10);
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status]);

  return {
    seconds,
    status,
    nextLap,
    laps,
    start,
    stop,
    reset,
    record
  };
};

export default UseStopwatch;
