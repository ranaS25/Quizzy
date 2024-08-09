import React, { useState } from 'react'
import { API_URL, categoryOptions, getApiUrl, Starter } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestions, setIsLoading } from '../redux/slices/quizSlice';
import Select from "react-select";



const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Meduim" },
  { value: "hard", label: "Hard" },
];


const customStyles = {
  control: (provided) => ({
    ...provided, 
    width: "fit-content",

})}



const QuizStarter = () => {

  const isQuizLoading = useSelector((store) => store.quiz.isLoading);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("any");




  const dispatch = useDispatch();

  const handleStartClick = async () => {
    dispatch(setIsLoading(true));

    try {
      const response = await fetch(getApiUrl(category,difficulty ));
      const data = await response.json();

      if (data.response_code !== 0) {
        dispatch(setIsLoading(false));
        return;
      }

      const arr = [];

      data.results.forEach((question) => {
        const obj = {
          question: question.question,
          all_answers: [
            ...question.incorrect_answers,
            question.correct_answer,
          ].sort(() => Math.random() - 0.5),
          correct_answer: question.correct_answer,
        };
        arr.push(obj);
      });

      dispatch(addQuestions(arr));

      dispatch(setIsLoading(false));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div className="w-full  h-full flex-grow box-border bg-green-100 dark:bg-slate-950 dark:text-white flex flex-col justify-center items-center  md:p-5 ">
      <p className="text-3xl w-[90%] font-bold text-[#333333] dark:text-[#c6c6c6]  md:text-6xl md:w-[80%]">
        {Starter.WELCOME_MESSAGE}
      </p>
      <p className="text-lg w-[90%]  dark:text-slate-100  my-10 md:text-2xl  md:w-[80%]">
        {Starter.DESCRIPTION_MESSAGE}
      </p>

    
      <div className="flex gap-4 py-4">
        
        <Select options={categoryOptions} onChange={(option) => {
          setCategory(option?.value)
        }} />


        <Select options={difficultyOptions} styles={ customStyles}
          onChange={(option) => {
          setDifficulty(option?.value)
        }} />
      </div>

      <button
        className="w-fit bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900 py-4 px-8 rounded border-4 border-blue-200 dark:border-blue-950 font-semibold bg-clip-padding text-xl text-white transition-all"
        onClick={handleStartClick}
      >
        {!isQuizLoading ? Starter.START_BUTTON_TEXT : "LOADING..."}
      </button>
    </div>
  );
}

export default QuizStarter