import { STUDENTS } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS.LOAD:
      return {
        ...state,
        loading: true,
      };
    case STUDENTS.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.students,
        error: "",
      };
    case STUDENTS.LOAD_FAIL:
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
