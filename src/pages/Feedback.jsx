import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { restartGame } from "../store/actions";

const difficultyMap = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

export default function Feedback() {
  const score = useSelector(state => state.player.score);
  const questions = useSelector(state => state.player.questions);
  const answers = useSelector(state => state.player.answers);
  const dispatch = useDispatch();
  const history = useHistory();

  const maxScore = questions.reduce((acc, curr) => {
    return acc + 30 + difficultyMap[curr.difficulty] * 30;
  }, 0);

  const percentScore = Number(((score / maxScore) * 100).toFixed(2));

  const percentStyles = useMemo(() => {
    if (percentScore < 20) {
      return {
        txtColor: "text-red-700",
        emoji: "😭",
      };
    }
    if (percentScore < 40) {
      return {
        txtColor: "text-orange-700",
        emoji: "😔",
      };
    }
    if (percentScore < 60) {
      return {
        txtColor: "text-yellow-700",
        emoji: "😕",
      };
    }
    if (percentScore < 80) {
      return {
        txtColor: "text-green-700",
        emoji: "😊",
      };
    }
    return {
      txtColor: "text-cyan-700",
      emoji: "🤩",
    };
  }, [percentScore]);

  return (
    <>
      <h1 className="text-3xl">Overview</h1>{" "}
      <p className="font-medium">
        You scored <span className={percentStyles.txtColor}>{score}</span> /{" "}
        {maxScore} {percentStyles.emoji}{" "}
        <span className={percentStyles.txtColor}>({percentScore}%)</span>
      </p>
      <button
        className="h-20 px-5 font-xl font-bold text-white rounded-lg bg-gradient-to-r from-lime-500 to-green-500"
        type="button"
        onClick={() => history.push("/game") || dispatch(restartGame())}
      >
        Play again
      </button>
    </>
  );
}
