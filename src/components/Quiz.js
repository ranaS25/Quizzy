import React, { useEffect } from "react";
import Question from "./Question";
import { useSelector } from "react-redux";

const Quiz = ({ questions }) => {


  const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex);

  const question = questions[currentQuestionIndex];

  useEffect(() => {
    document.getElementById("quiz-progress").style.width =
      currentQuestionIndex * 10 + "%";
  });

  return (
    <div className="py-4 w-full px-1 md:px-4 lg:px-24">
      <p>Progress</p>
      <div className="w-full h-fit rounded bg-slate-300 dark:bg-slate-700">
        <div
          id={"quiz-progress"}
          className={
            " pl-2 py-2 h-fit min-w-fit bg-gradient-to-r from-blue-300 to-blue-500 rounded my-3 "
          }
        >
          <p className="text-right mr-2 text-lg  text-white">
            {currentQuestionIndex * 10 + " %"}
          </p>
        </div>
      </div>

      <Question
        question={question.question}
        all_answers={question.all_answers}
        correct_answer={question.correct_answer}
      />
    </div>
  );
};

export default Quiz;
