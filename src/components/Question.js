import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { submitAnswer } from "../redux/slices/quizSlice";
import { decodeHtmlEntities } from "../utils/constants";


const Question = ({ question, all_answers, correct_answer }) => {
  const dispatch = useDispatch();
  const AnswerSuggestRef = useRef(null);

  const [answerSelected, setAnswerSelected] = useState(-1);

  const handleAnswerSelect = (index) => {
    AnswerSuggestRef.current.style.display = "initial";
    AnswerSuggestRef.current.style.opacity = "1";
    setAnswerSelected(index);

    setTimeout(() => {
      AnswerSuggestRef.current.style.display = "none";
      setAnswerSelected(-1);
      dispatch(submitAnswer(index));
    }, 2000);
  };
  return (
    <div className="w-full h-fit flex flex-col gap-3 px-2 dark:text-white/90 ">
      <p className="text-lg py-4 font-bold text-black/80 dark:text-white/90 lg:text-xl">
        {decodeHtmlEntities(question)}
      </p>
      <div className="w-full gap-2 flex flex-col font-semibold items-stretch md:gap-4 lg:gap-6">
        {all_answers.map((answer, index) => (
          <p
            className={
              "border p-2 rounded  cursor-pointer  transition-colors duration-200 md:font-semibold md:text-lg lg:p-4 lg:text-lg " +
              (answerSelected === index
                ? " bg-slate-400 dark:bg-slate-600 "
                : " hover:bg-black/10 dark:hover:bg-slate-700 dark:bg-slate-800")
            }
            key={index}
            onClick={(e) => {
              if (answerSelected < 0) handleAnswerSelect(index);
            }}
          >
            {answer}
          </p>
        ))}
      </div>

      <div
        ref={AnswerSuggestRef}
        className=" transition-opacity duration-1000 opacity-0"
      >
        <p className="text-slate-600 font-bold my-2 md:my-4 dark:text-slate-200 lg:text-lg">
          Correct Answer
        </p>
        <p className="border-2  border-green-400 bg-green-200 dark:bg-green-800 p-2 rounded md:font-semibold md:text-lg lg:p-4 lg:text-lg ">
          {correct_answer}
        </p>
      </div>
    </div>
  );
};

export default Question;
