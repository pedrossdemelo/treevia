import { useMemo } from "react";
import { difficultyMap } from "../pages/Feedback";

export default function AnswerDetails({
  isCorrect,
  isTimedOut,
  isWrong,
  timeLeft,
  category,
  answer,
  correctAnswer,
  question,
  difficulty,
}) {
  const difficultyColor = useMemo(() => {
    if (difficulty === "easy") return "text-success";
    if (difficulty === "medium") return "text-warning";
    if (difficulty === "hard") return "text-error";
  }, [difficulty]);

  const statusColor = useMemo(() => {
    if (isCorrect) return "text-success";
    if (isTimedOut) return "text-purple-700 text-purple-400";
    if (isWrong) return "text-error";
  }, [isCorrect, isTimedOut, isWrong]);

  const tintBg = useMemo(() => {
    if (isCorrect) return "bg-green-500/10";
    if (isTimedOut) return "bg-purple-500/10";
    if (isWrong) return "bg-red-500/10";
  }, [isCorrect, isTimedOut, isWrong]);

  const result = isCorrect ? "Correct" : isTimedOut ? "Timed out" : "Wrong";

  return (
    <div
      className={`flex flex-col items-stretch rounded-lg justify-between min-h-[80px]
      px-5 py-3 font-medium ${tintBg} min-w-[min(340px,90vw)] text-sm gap-4`}
    >
      <div className="flex align-text-top justify-between uppercase gap-4 items-center">
        <span>{category.split(":")[1] ?? category}</span>
        <span className={`${difficultyColor}`}>{difficulty}</span>
      </div>
      <span className="opacity-80">{question}</span>
      <span className="opacity-80">Answer: {correctAnswer}</span>
      <div
        className={`${statusColor} flex align-text-bottom justify-between gap-4 items-center`}
      >
        <span>
          {!isWrong && result}
          {isCorrect && <span>{` w/ ${timeLeft}s left`}</span>}
          {isWrong && <span>{`You answered: ${answer}`}</span>}
        </span>

        {isCorrect && (
          <span>+ {30 + difficultyMap[difficulty] * timeLeft}</span>
        )}
        {!isCorrect && <span>+ 0</span>}
      </div>
    </div>
  );
}
