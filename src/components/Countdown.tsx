import { formatTime } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Props {
  initialTime: number;
  restTime: number;
}

export default function Countdown({ initialTime, restTime }: Props) {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);

  const handleStartCountdown = () => {
    setIsRunning(true);
  };

  const handleResetCountdown = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const handleNotify = () => {
    const audio = new Audio(
      '/sound-effect.mp3'
    );
    audio.play();
    if (Notification.permission === 'granted') {
      const notification = new Notification('Eye Guardian', {
        body: '👀 Time to rest! Look 20 feet away for 20 seconds.',
      });

      setTimeout(() => {
        notification.close();
      }, restTime * 1000);
    }
  };

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      handleNotify();
      setIsResting(true);
      setTimeout(() => {
        setTime(initialTime);
        setIsResting(false);
      }, restTime * 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, time, initialTime, restTime]);

  return (
    <>
      <div className="countdown">{isResting ? 'Rest' : formatTime(time)}</div>
      <div className="countdown-group">
        <button
          onClick={handleStartCountdown}
          className="countdown-primary-button">
          Start
        </button>
        <button
          onClick={handleResetCountdown}
          className="countdown-secondary-button">
          Reset
        </button>
      </div>
      {Notification.permission === 'denied' && (
        <p className='warning'>- Enable notifications to get alerts.</p>
      )}
    </>
  );
}
