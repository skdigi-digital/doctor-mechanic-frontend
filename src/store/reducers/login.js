import { LOGIN } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case LOGIN.LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOGIN.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.login,
        error: "",
      };
    case LOGIN.LOAD_FAIL:
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
