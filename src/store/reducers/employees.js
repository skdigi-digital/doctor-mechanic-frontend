import { EMPLOYEES } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case EMPLOYEES.LOAD:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYEES.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.employees,
        error: "",
      };
    case EMPLOYEES.LOAD_FAIL:
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
