import React from "react";
import Header from "./components/Header";
import QuizStarter from "./components/QuizStarter";
import { useSelector } from "react-redux";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";


const App = () => {

  const questions = useSelector(store => store.quiz.questions)
  const isQuizOver = useSelector(store => store.quiz.isQuizOver);


  return (
    <div className="min-h-dvh h-fit flex flex-col dark:bg-slate-800 dark:text-white/90">
      <Header />
      {!questions && <QuizStarter />}
      {questions && isQuizOver === false && <Quiz questions={questions} /> }
      {questions && isQuizOver && <QuizResult totalQuestions={questions.length} />}
      

      

      
    
    </div>
  );
};

export default App;
