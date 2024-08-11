import { API_URL } from "./constants";

export const getApiUrl = (category, difficulty) => {
  const difficultysString = difficulty != "" ? "&difficulty=" + difficulty : "";
  return API_URL + "&category" + category + difficultysString;
};

export const decodeHtmlEntities = (text) => {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

export const modifyResponseArray = (questions) => {
  const newArr = [];

  questions.forEach((question) => {
    const modifiedIncorrectAnswers = question.incorrect_answers.map(
      (answer) => {
        return decodeHtmlEntities(answer);
      }
    );

    const obj = {
      question: decodeHtmlEntities(question.question),
      all_answers: [
        ...modifiedIncorrectAnswers,
        decodeHtmlEntities(question.correct_answer),
      ].sort(() => Math.random() - 0.5),
      correct_answer: decodeHtmlEntities(question.correct_answer),
    };
    newArr.push(obj);
  });
  return newArr;
};
