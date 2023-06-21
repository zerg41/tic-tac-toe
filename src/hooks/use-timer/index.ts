import { useRef, useState } from 'react';

interface ITimer {
  readonly elapsedSeconds: number;
  readonly start: () => void;
  readonly stop: () => void;
  readonly reset: () => void;
}

type TimerHook = (initialSecond?: number) => ITimer;

const useTimer: TimerHook = (initialSecond = 0) => {
  let [elapsedSeconds, setElapsedSeconds] = useState(initialSecond);
  let timerRef = useRef<NodeJS.Timer | null>(null);

  function startTimer() {
    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((seconds) => seconds + 1);
      }, 1000);
    }
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function resetTimer() {
    setElapsedSeconds(initialSecond);
  }

  const timer: ITimer = {
    elapsedSeconds: elapsedSeconds,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  };

  return timer;
};

export default useTimer;
