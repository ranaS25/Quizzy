import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuiz } from '../redux/slices/quizSlice';

const QuizResult = () => {
  const dispatch = useDispatch();

  const score = useSelector(store => store.quiz.score)
  useEffect(() => { 
    const timerId = setTimeout(() => {
      dispatch(resetQuiz(true));

    }, 5000)

    return () => { 
      clearTimeout(timerId);
    }
  }, [])
  return (
    <div>QuizResult

      <p>score: { score}</p>
    </div>
  )
}

export default QuizResult