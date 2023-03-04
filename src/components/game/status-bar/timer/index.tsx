import { FC } from 'react';
// utils
import { toTimeString } from 'utils/functions';

type TimerProps = {
  seconds: number;
};

const Timer: FC<TimerProps> = ({ seconds }) => {
  return (
    <div className='Timer'>
      <span className='Timer-TimeValue'>{toTimeString(seconds)}</span>
    </div>
  );
};

export default Timer;
