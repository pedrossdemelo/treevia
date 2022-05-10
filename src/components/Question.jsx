import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shuffle } from '../utils';
import AnswerButton from './AnswerButton';
import Timer from './Timer';

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

  const AnswerTimeout = 30000;
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!answered) {
        setAnswered(true);
      }
    }, AnswerTimeout);
    if (answered) clearTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [answered]);

  // const parser = new DOMParser();
  // const parsedQuestion = parser.parseFromString(question, 'text/html').body //   .textContent;

  return (
    <div>
      <h5>{category}</h5>
      <h3>{question}</h3>
      <Timer answered={ answered } />
      <div>
        {shuffle([
          ...incorrectAnswers.map((a, i) => (
            <AnswerButton
              clicked={ answered }
              disabled={ answered }
              key={ a }
              body={ a }
              index={ i }
              setAnswered={ setAnswered }
            />
          )),
          <AnswerButton
            clicked={ answered }
            disabled={ answered }
            key={ correctAnswer }
            body={ correctAnswer }
            setAnswered={ setAnswered }
            isCorrect
            difficulty={ difficulty }
          />,
        ])}
      </div>
      {answered && (
        <button
          type="button"
          onClick={ () => {
            const FINAL_INDEX = 4;
            if (index === FINAL_INDEX) return goToFeedback();
            nextQuestion();
          } }
        >
          Next
        </button>
      )}
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
