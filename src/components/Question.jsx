import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { shuffle } from "../utils";
import AnswerButton from "./AnswerButton";
import Timer from "./Timer";

const ANSWER_TIMEOUT = 30000;

export function Question(props) {
  const {
    category,
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
    difficulty,
    nextQuestion,
    goToFeedback,
    index,
  } = props;

  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!answered) {
        setAnswered(true);
      }
    }, ANSWER_TIMEOUT);
    if (answered) clearTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [answered]);

  const parser = new DOMParser();
  const parsedQuestion = parser.parseFromString(question, "text/html").body
    .textContent;

  const answers = useMemo(
    () => shuffle([...incorrectAnswers, correctAnswer]),
    [incorrectAnswers, correctAnswer, shuffle]
  );

  return (
    <div>
      <h1 className="text-2xl">{parsedQuestion}</h1>
      <div className="flex gap-2">
        <p className="bg-white rounded-full py-1 px-3">{category}</p>
        <p className="bg-white rounded-full py-1 px-3">
          {difficulty[0].toUpperCase() + difficulty.slice(1)}
        </p>
      </div>
      <div>
        {answers.map(answer => (
          <AnswerButton
            clicked={answered}
            disabled={answered}
            key={answer}
            body={answer}
            setAnswered={setAnswered}
            isCorrect={answer === correctAnswer}
            difficulty={difficulty}
          />
        ))}
      </div>

      <div className="flex justify-center items-center">
        {!answered && <Timer answered={answered} />}

        {answered && (
          <button
            type="button"
            onClick={() => {
              const FINAL_INDEX = 4;
              if (index === FINAL_INDEX) return goToFeedback();
              nextQuestion();
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

Question.propTypes = {
  correct_answer: PropTypes.string.isRequired,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  goToFeedback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Question;
