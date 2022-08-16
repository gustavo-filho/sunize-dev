import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { addMinutes } from 'date-fns';
import Watch from '../../paymet/assets/watch.png';
import { Container, CountTime } from './count-down.styles';
import { CountdownPropsType } from './interfaces/count-down-props.types';

export function Countdown({ header, timer }: CountdownPropsType): JSX.Element {
  const [time, setTime] = useState((timer?.time && timer.time * 60) || 10 * 60);
  const [isActive, setIsActive] = useState(false);
  // const [hasFinished, setHasFinished] = useState(() => {
  //   if (Cookies.get('countTime') === '0') return true
  //   else return false
  // })

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

  useEffect(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
        Cookies.set('countTime', String(time - 1), {
          expires: addMinutes(new Date(), 5),
        });
      }, 1000);
    } else if (isActive && time === 0) {
      // setHasFinished(true)
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <Container headerColor={header?.color || '#d52d2d'}>
      <div>
        {timer?.allowed && (
          <CountTime>
            <div>
              <span>0</span>
              <span>0</span>
            </div>
            <span>:</span>
            <div>
              <span>{minuteLeft}</span>
              <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
              <span>{secondsLeft}</span>
              <span>{secondsRight}</span>
            </div>
          </CountTime>
        )}
        <footer>
          <img src={Watch} alt="Relógio" />
          <p>
            Essa Promoção é por
            <br /> Tempo Limitado
          </p>
        </footer>
      </div>
    </Container>
  );
}
