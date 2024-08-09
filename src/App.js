import React from "react";
import Header from "./components/Header";
import QuizStarter from "./components/QuizStarter";
import { useSelector } from "react-redux";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";


const App = () => {

  const questions = useSelector(store => store.quiz.questions)
  const isQuizOver = useSelector(store => store.quiz.isQuizOver);

  console.log(isQuizOver);
  return (
    <div className="min-h-dvh h-screen flex flex-col">
      <Header />
      {!questions && <QuizStarter />}
      {isQuizOver===false && <Quiz questions={questions} />}
      {isQuizOver  && <QuizResult/>}
    </div>
  );
};

export default App;
