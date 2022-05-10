import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Feedback() {
  const score = useSelector(state => state.player.score);
  const feedbackMessages = ["Well done!", "Could be better..."];
  const minScore = 3;
  const history = useHistory();

  return (
    <>
      <h1>Feedback</h1>
      <h2>{feedbackMessages[score >= minScore ? 0 : 1]}</h2>

      <button type="button" onClick={() => history.push("/")}>
        Jogar Novamente
      </button>
    </>
  );
}
