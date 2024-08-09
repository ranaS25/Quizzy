import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz } from "../redux/slices/quizSlice";

const QuizResult = ({ totalQuestions}) => {
  const dispatch = useDispatch();
  const [remainingSeconds, setRemainingSeconds] = useState(10);

  const score = useSelector((store) => store.quiz.score);
  useEffect(() => {
    let timerId = setInterval(() => {
      setRemainingSeconds((time) => {
        if (time === 0) {
          clearTimeout(timerId);
          setTimeout(()=>{dispatch(resetQuiz())}, 1000);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-10 justify-center grow px-5 bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-900 dark:to-blue-900">
      <p className="text-4xl  font-extrabold lg:text-6xl text-center ">
        You Scored {score} out of {totalQuestions}.
      </p>


      <p className="pt-10 text-center md:text-lg lg:text-xl">
        redirecting to the Start Page in {remainingSeconds} seconds
      </p>
    </div>
  );
};

export default QuizResult;
