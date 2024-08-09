import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice"

const appStore = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default appStore;
