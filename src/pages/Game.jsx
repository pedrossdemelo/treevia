import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setQuestions, setToken } from "../store/actions";
import { getToken } from "../utils";
import { Question } from "../components";

function Game() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(state => state.token);
  const questions = useSelector(state => state.player.questions);
  const answers = useSelector(state => state.player.answers);
  const [currQuestion, setCurrQuestion] = useState(0);
  const nextQuestion = () => setCurrQuestion(currQuestion + 1);
  const goToFeedback = () => history.push("/feedback");

  const getAnswers = useCallback(
    async token => {
      const URL = "https://opentdb.com/api.php?amount=10&token=";
      const res = await fetch(URL + token);
      const data = await res.json();
      const { response_code: responseCode, results } = data;
      if (responseCode !== 0) {
        const newToken = await getToken();
        return dispatch(setToken(newToken));
      }
      return dispatch(setQuestions(results));
    },
    [dispatch]
  );

  useEffect(() => {
    getAnswers(token);
  }, [token, getAnswers]);

  const DIFFICULTY_PALETTE = {
    easy: "bg-lime-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  return (
    <div className="mx-4">
      <div className="flex gap-4 items-center justify-center mt-4 mb-6">
        {questions.map((q, i) => (
          <div
            className={`h-4 aspect-square rounded-full transition-all duration-500 ${
              DIFFICULTY_PALETTE[q.difficulty]
            } ${i < answers.length ? "opacity-40" : ""} ${i === currQuestion ? "h-6 -m-1" : ""}`}
            key={q.question}
          />
        ))}
      </div>
      {questions.map((q, i) => {
        if (i === currQuestion) {
          return (
            <Question
              key={q.question}
              nextQuestion={nextQuestion}
              goToFeedback={goToFeedback}
              index={currQuestion}
              {...q}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default Game;
