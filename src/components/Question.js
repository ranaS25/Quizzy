import React from "react";
import { useDispatch } from "react-redux";
import { submitAnswer } from "../redux/slices/quizSlice";

const Question = ({ question, all_answers, correct_answer }) => {
const dispatch = useDispatch()

  const handleAnswerSelect = (e, index) => {
    
    if (all_answers[index] === correct_answer) {
      console.log("answer is correct")
      e.target.style.backgroundColor = "rgba(0, 255, 0,0.20)"
      
    }
    else {
      console.log("answer is incorrrect");
       e.target.style.backgroundColor = "rgba(255, 0, 0,0.30)";
    }
    setTimeout(() => {
      e.target.style.backgroundColor = "transparent"
      dispatch(submitAnswer(index))
    }, 1000);
    
  }
  return (
    <div className="w-full h-fit flex flex-col gap-3 px-2">
      <p>{question}</p>
      <div className="w-full gap-2 flex flex-col font-semibold items-stretch">
        {all_answers.map((answer, index) => (
          <p className="border py-2 pl-2 rounded hover:bg-black/10 cursor-pointer bg-transparent" key={index}
          onClick={(e) =>{handleAnswerSelect(e, index)}}>
            {answer}
          </p>
        ))}
      </div>
      
      <div >
        <p className="text-slate-600 font-bold my-4">Correct Answer/wrong Answer</p>
        <p className="border-2  border-green-400 bg-green-200 py-2 pl-2 rounded">{correct_answer}</p>
      </div>
    </div>
  );
};

export default Question;
