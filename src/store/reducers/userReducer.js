const initialState = {
  name: localStorage.getItem("name") || "",
  assertions: "",
  score: 0,
  highScore: localStorage.getItem("highScore") || 0,
  gravatarEmail: localStorage.getItem("gravatarEmail") || "",
  questions: [],
  answers: [],
  category: "any",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/nameSet":
      localStorage.setItem("name", action.payload);
      return {
        ...state,
        name: action.payload,
      };
    case "user/emailSet":
      localStorage.setItem("gravatarEmail", action.payload);
      return {
        ...state,
        gravatarEmail: action.payload,
      };
    case "user/scoreUpdate":
      const highScore =
        action.payload > state.highScore ? action.payload : state.highScore;
      localStorage.setItem("highScore", highScore);
      return {
        ...state,
        score: action.payload,
        highScore,
      };
    case "user/logout":
      localStorage.removeItem("name");
      localStorage.removeItem("gravatarEmail");
      localStorage.removeItem("highScore");
      return {
        name: "",
        assertions: "",
        score: 0,
        highScore: 0,
        gravatarEmail: "",
        questions: [],
        answers: [],
      };
    case "user/setQuestions":
      return {
        ...state,
        questions: action.payload,
      };
    case "user/setAnswers":
      return {
        ...state,
        answers: action.payload,
      };
    case "user/restartGame":
      return {
        ...state,
        score: 0,
        questions: [],
        answers: [],
      };
    case "user/setCategory":
      return {
        ...state,
        category: action.payload,
      }
    default:
      return state;
  }
}
