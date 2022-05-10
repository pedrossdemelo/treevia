import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateScore } from "../store/actions";

function AnswerButton({
  body,
  isCorrect = false,
  clicked,
  setAnswered,
  disabled,
  difficulty,
}) {
  const tick = 1000;

  const defaultTimer = 30;
  const [timer, setTimer] = useState(defaultTimer);

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

  const dispatch = useDispatch();

  const pontuation = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  const basePontuation = 10;

  const score = useSelector(state => state.player.score);

  const borderColor = clicked
    ? isCorrect
      ? "border-success"
      : "border-error"
    : "border-neutral-400";

  return (
    <button
      disabled={disabled}
      className={`rounded-lg m-2 border-b-4 border-x-[1.5px] border-t-[0.5px] ${borderColor} p-2`}
      onClick={() => {
        setAnswered(true);
        if (isCorrect) {
          console.log(timer);
          dispatch(
            updateScore(
              score + (basePontuation + pontuation[difficulty] * timer)
            )
          );
        }
      }}
      key={body}
      type="button"
    >
      {body}
    </button>
  );
}

AnswerButton.propTypes = {
  body: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool,
  index: PropTypes.number,
  clicked: PropTypes.bool.isRequired,
  setAnswered: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  difficulty: PropTypes.string.isRequired,
};

AnswerButton.defaultProps = {
  isCorrect: false,
  index: undefined,
};

export default AnswerButton;
