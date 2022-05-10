import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const defaultTimer = 30;

function Timer({ start = defaultTimer, answered }) {
  const tick = 1000;

  const [timer, setTimer] = useState(start);

  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, tick);
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  useEffect(() => {
    if (answered) setTimer(0);
  }, [answered]);

  return <h4>{timer}</h4>;
}

Timer.propTypes = {
  start: PropTypes.number,
  answered: PropTypes.bool.isRequired,
};

Timer.defaultProps = {
  start: defaultTimer,
};

export default Timer;
