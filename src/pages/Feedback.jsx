import { ArrowRight } from "phosphor-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { restartGame } from "../store/actions";
import { parseHTML } from "../utils";
import { AnswerDetails } from "../components";

export const difficultyMap = {
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

  const answeredQuestions = questions.map((q, i) => {
    const [answer, timeLeft] = answers[i].split(" | ");
    const isCorrect = timeLeft !== undefined;
    const isTimedOut = answer === "Timed out!";
    const isWrong = !isCorrect && !isTimedOut;

    const category = q.category;
    const difficulty = q.difficulty;
    const question = parseHTML(q.question);
    const correctAnswer = parseHTML(q.correct_answer);

    return {
      category,
      difficulty,
      answer,
      question,
      correctAnswer,
      isCorrect,
      isTimedOut,
      isWrong,
      timeLeft,
    };
  });

  const percentScore = Number(((score / maxScore) * 100).toFixed(2));

  const percentStyles = useMemo(() => {
    if (percentScore < 20) {
      return {
        txtColor: "text-red-700 dark:text-red-500",
        emoji: "😭",
      };
    }
    if (percentScore < 40) {
      return {
        txtColor: "text-orange-700 dark:text-orange-500",
        emoji: "😔",
      };
    }
    if (percentScore < 60) {
      return {
        txtColor: "text-yellow-700 dark:text-yellow-500",
        emoji: "😕",
      };
    }
    if (percentScore < 80) {
      return {
        txtColor: "text-green-700 dark:text-green-500",
        emoji: "😊",
      };
    }
    return {
      txtColor: "text-cyan-700 dark:text-cyan-500",
      emoji: "🤩",
    };
  }, [percentScore]);

  return (
    <div className="w-[clamp(320px,90vw,600px)] mx-4">
      <h1 className="text-[clamp(30px,6vw,60px)] text-center">Overview</h1>{" "}
      {answeredQuestions.length > 0 && (
        <>
          <p className="font-medium text-center opacity-80">
            You scored <span className={percentStyles.txtColor}>{score}</span> /{" "}
            {maxScore} {percentStyles.emoji}{" "}
            <span className={percentStyles.txtColor}>({percentScore}%)</span>
          </p>
          <div className="flex flex-col gap-4 items-stretch w-full my-4">
            {answeredQuestions.map((q, i) => {
              return <AnswerDetails {...q} key={i} />;
            })}
          </div>
        </>
      )}
      <details className="text-xs text-center mb-4 cursor-pointer">
        <summary>How scores are calculated</summary>
        30 points base + (seconds left * difficulty) <br /> Easy: 1 | Medium:
        1.5 | Hard: 2
      </details>
      <button
        className="h-20 w-full px-5 font-xl font-bold text-white rounded-lg
        bg-gradient-to-r from-lime-500 to-green-500 flex justify-between items-center"
        type="button"
        onClick={() => history.push("/game") || dispatch(restartGame())}
      >
        <span>Play again</span>

        <ArrowRight weight="bold" size="24px" />
      </button>
    </div>
  );
}
