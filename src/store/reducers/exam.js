import { EXAMS } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAMS.LOAD:
      return {
        ...state,
        loading: true,
      };
    case EXAMS.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.exams,
        error: "",
      };
    case EXAMS.LOAD_FAIL:
      return {
        loading: false,
        data: [],
        error: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
