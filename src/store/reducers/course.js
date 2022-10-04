import { COURSE } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case COURSE.LOAD:
      return {
        ...state,
        loading: true,
      };
    case COURSE.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.course,
        error: "",
      };
    case COURSE.LOAD_FAIL:
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
