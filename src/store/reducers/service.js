import { SERVICE } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SERVICE.LOAD:
      return {
        ...state,
        loading: true,
      };
    case SERVICE.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.service,
        error: "",
      };
    case SERVICE.LOAD_FAIL:
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
