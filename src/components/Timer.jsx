import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

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
      setTimer(time => time - 1);
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

  const timerClass = useMemo(() => {
    if (timer <= 3) return "bg-red-500";
    if (timer <= 6) return "bg-orange-500";
    if (timer <= 9) return "bg-amber-500";
    if (timer <= 12) return "bg-yellow-500";
    if (timer <= 15) return "bg-lime-500";
    if (timer <= 18) return "bg-green-500";
    if (timer <= 21) return "bg-emerald-500";
    if (timer <= 24) return "bg-teal-500";
    if (timer <= 27) return "bg-cyan-500";
    return "bg-sky-500";
  }, [timer]);

  return (
    <div
      className={`h-20 ${timerClass} overflow-hidden transition ease-linear duration-[3000ms] relative rounded-lg flex items-center justify-center`}
    >
      <div
        className={`absolute top-0 bottom-0 transition-all ease-linear duration-1000 left-0 opacity-10 bg-black`}
        style={{ width: `${((31 - timer) / 30) * 100}%` }}
      />

      <h4 className="text-white text-2xl font-bold relative z-9 tracking-wide">{timer}</h4>
    </div>
  );
}

Timer.propTypes = {
  start: PropTypes.number,
};

Timer.defaultProps = {
  start: defaultTimer,
};

export default Timer;
