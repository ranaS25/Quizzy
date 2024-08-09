import React from 'react'
import { Starter } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestions, setIsLoading } from '../redux/slices/quizSlice';




const QuizStarter = () => {

  const isQuizLoading = useSelector((store) => store.quiz.isLoading);
  // console.log("rendering")
  const dispatch = useDispatch();

  const handleStartClick = async () => {
    
    dispatch(setIsLoading(true));

    
  
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=30&difficulty=easy"
      );
      const data = await response.json();
      // console.log(data);

      if (data.response_code !== 0) {
        dispatch(setIsLoading(false));
        return;
      }

      // Handle fetched data
      // console.log(data);

      const arr = [];


      data.results.forEach(question => {

        const obj = {
          question: question.question,
          all_answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
          correct_answer: question.correct_answer
        }
        arr.push(obj)

      })
      // console.log(arr);
      dispatch(addQuestions(arr));


     
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error("Error fetching data:", error);
    } 

  }


  return (
    <div className="w-full h-full box-border bg-green-100 dark:bg-slate-950 dark:text-white flex flex-col justify-center items-center p-5">
      <p className="text-3xl font-bold text-[#333333] dark:text-[#c6c6c6] w-[80%]">{ Starter.WELCOME_MESSAGE}</p>
      <p className="text-lg dark:text-slate-100 w-[80%] my-10">{ Starter.DESCRIPTION_MESSAGE}</p>
      <button className="w-fit bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900 py-4 px-8 rounded border-4 border-blue-200 dark:border-blue-950 font-semibold bg-clip-padding text-xl text-white transition-all"
      onClick={handleStartClick}>
        {!isQuizLoading? Starter.START_BUTTON_TEXT: "LOADING..."}
      </button>
    </div>
  );
}

export default QuizStarter