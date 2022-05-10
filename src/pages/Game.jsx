import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setToken } from '../store/actions';
import { getToken } from '../utils';
import { Question } from '../components';

function Game() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.token);
  const [currResults, setResults] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(0);
  const nextQuestion = () => setCurrQuestion(currQuestion + 1);
  const goToFeedback = () => history.push('/feedback');

  const getAnswers = useCallback(
    async (t) => {
      const URL = 'https://opentdb.com/api.php?amount=5&token=';
      const res = await fetch(URL + t);
      const data = await res.json();
      const { response_code: responseCode, results } = data;
      if (responseCode !== 0) {
        const newToken = await getToken();
        return dispatch(setToken(newToken));
      }
      return setResults(results);
    },
    [dispatch],
  );

  useEffect(() => {
    getAnswers(token);
  }, [token, getAnswers]);

  return (
    <div>
      {currResults.map((q, i) => {
        if (i === currQuestion) {
          return (
            <Question
              key={ q.question }
              { ...q }
              nextQuestion={ nextQuestion }
              goToFeedback={ goToFeedback }
              index={ currQuestion }
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default Game;
