import { createSlice, current } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    isLoading: false,
    questions: null, //[1:{what is this, options: ["ds", "Ddf", "Ddfd", "Dfdf"]}, 2:{}]
    currentQuestionIndex: -1,
    answers: [], //[823, 324, 323]
    score: null,
    isQuizOver: null,
    error: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addQuestions: (state, action) => {
      state.currentQuestionIndex = 0;
      state.questions = action.payload;
      state.score = 0;
      state.isQuizOver = false;    
    },
    
    
    submitAnswer: (state, action) => {

      state.answers.push(action.payload);
      const question = state.questions[state.currentQuestionIndex]

      if (question.all_answers[action.payload] === question.correct_answer) {
        state.score += 1;
      }
      
      if (state.currentQuestionIndex === state.questions.length - 1) {
        state.isQuizOver = true;
      }
      state.currentQuestionIndex += 1;
  
    },
    resetQuiz: (state) => {
      
      state.questions = null;
      state.currentQuestionIndex = -1;
      state.answers = [];
      state.score = null;
      state.isQuizOver = null;
      state.error = null;
      
    }
    

  },
});

export const { setIsLoading, addQuestions, submitAnswer , resetQuiz} =
  quizSlice.actions;
export default quizSlice.reducer;
