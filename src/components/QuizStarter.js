import React from "react";
import {
  categoryOptions,
  Starter,
  difficultyOptions,
  categoryOptions,
} from "../utils/constants";

import { customStyles } from "../utils/customStyles";

import { getApiUrl, modifyResponseArray } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestions,
  setCategory,
  setDifficulty,
  setIsLoading,
} from "../redux/slices/quizSlice";
import Select from "react-select";

const QuizStarter = () => {
  const isQuizLoading = useSelector((store) => store.quiz.isLoading);

  const category = useSelector((store) => store.quiz.category);
  const difficulty = useSelector((store) => store.quiz.difficulty);

  const dispatch = useDispatch();

  const handleStartClick = async () => {
    dispatch(setIsLoading(true));
    console.log(getApiUrl(category, difficulty));
    try {
      const response = await fetch(getApiUrl(category, difficulty));
      const data = await response.json();

      if (data.response_code !== 0) {
        dispatch(setIsLoading(false));
        return;
      }

      const modifiedArr = modifyResponseArray(data.results);

      dispatch(addQuestions(modifiedArr));

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
        <Select
          options={categoryOptions}
          styles={customStyles}
          placeholder={"Category"}
          onChange={(option) => {
            dispatch(setCategory(option?.value));
          }}
        />

        <Select
          options={difficultyOptions}
          styles={customStyles}
          placeholder={"Difficulty"}
          onChange={(option) => {
            dispatch(setDifficulty(option?.value));
          }}
        />
      </div>

      <button
        className="w-fit bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900 py-4 px-8 rounded border-4 border-blue-200 dark:border-blue-950 font-semibold bg-clip-padding text-xl text-white transition-all"
        onClick={handleStartClick}
      >
        {!isQuizLoading ? Starter.START_BUTTON_TEXT : "LOADING..."}
      </button>
    </div>
  );
};

export default QuizStarter;
